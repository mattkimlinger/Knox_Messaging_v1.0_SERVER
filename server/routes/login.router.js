const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../modules/pool');
const router = express.Router();
const jwt = require('jsonwebtoken');
const hashScripts = require('../modules/encryption');
router.use(bodyParser.json());

router.post('/', async (req, res) => {
    try {
        //getUserInfo checks password and if matches, retrieves user data
        const userInfo = await getUserInfo(req, res);

        const passwordEntered = req.body.password;
        const { username, storedPassword } = userInfo || {};

        //salts & hash entered pass word, than compares with the saved password
        const match = hashScripts.comparePassword(passwordEntered, storedPassword);
        //case, passwords do not match, send a 401 status
        //else send user data
        if (!match) {
            console.log('incorrect password')
            res.sendStatus(402);
            // res.send({ "status": 400, "error": 'Password is incorrect.' });
            return;
        }
        //else, if match is true
        try {
            console.log('userInfo.userId : ', userInfo.userId);

            //registering a token for the user
            const token = jwt.sign({
                userId: userInfo.userId,
                username: username
            },"secret", {expiresIn: "3 hours"});
            // console.log('token declared');

            //gathering user data from the database
            const userInfoQuery = await pool.query(
                `SELECT
                 id, username,
                first_name, last_name, 
                email, date_created 
                FROM users WHERE id = $1;`, [userInfo.userId]
            );
            console.log('userInfoQuery declared');
            const contactsQuery = await pool.query(
                `SELECT
                contacts.contact_id as contact_id,
                users.first_name as contact_first_name,
                users.last_name as contact_last_name,
                users.username as contact_username
                FROM contacts 
                JOIN users ON contacts.contact_id = users.id
                WHERE user_id = $1;`,
                [userInfo.userId]
            );
            console.log('contactsQuery declared');

            const conversationsQuery = await pool.query(
                `SELECT *
                FROM conversations 
                WHERE receiver_id = $1
                OR sender_id = $2`,
                [userInfo.userId, userInfo.userId]
            );
            console.log('conversationsQuery declared');

            const userMessagesQuery = await pool.query(
                `SELECT *
                FROM messages
                WHERE receiver_id = $1  OR sender_id = $2 ORDER BY id DESC`,
                
                [userInfo.userId, userInfo.userId]
            );
            console.log('userMessagesQuery: ', userMessagesQuery.rows);
            //structuring response
            const userData = {
                token: token,
                userInfo: userInfoQuery.rows,
                contacts: contactsQuery.rows,
                userMessages: userMessagesQuery.rows,
                conversations: conversationsQuery.rows
            };
            console.log('token: ', token);
            //send user data back in response
            res.send(
                userData
            )
        } catch (error) {
            //gathering user data was not successful
            console.log('error', error);
            res.sendStatus(501)
        }
    } catch (error) {
        console.log('login error: ', error);
        res.sendStatus(500);
    }
})


const getUserInfo = async (req, res) => {
    const usernameEntered = req.body.username;
    const passwordEntered = req.body.password;
    //both entry valid safety check
    if (!usernameEntered || !passwordEntered) {
        res.status(400).send("Error, Username or password not supplied");
        return;
    }
    const usernameSearch = await pool.query(
        `SELECT id, username, password FROM users WHERE username = $1`, [usernameEntered]
    );
    //safety check on password entry
    if (!usernameSearch ||
        !usernameSearch.rows ||
        !usernameSearch.rows[0] ||
        !usernameSearch.rows[0].password
    ) {
        console.log('No Matching Usernames Found');
        res.send({ "status": 402, "error": 'No Matching Usernames found' });
        return;
    }
    return {

        userId: usernameSearch.rows[0].id,
        username: usernameSearch.rows[0].username,
        storedPassword: usernameSearch.rows[0].password,
    }
}

// router.get('/', async (req, res) => {
//     try {
//         const token = req.body.token;
//     }
// })

module.exports = router;