const tokenValidation = require('../modules/tokenValidation');
const express = require('express');
const pool = require('../modules/pool');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());

router.put("/", async (req, res) => {
    console.log('req.body', req.body);
    const token = req.body.token;
    const id = req.body.id;
    const tokenToId = await tokenValidation(token);
    console.log('tokenToId: ', tokenToId);
    if (tokenToId === id) {
        try {
            console.log('token is valid!');

            const username = req.body.username;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const email = req.body.email;

            let updateUserInfo = `
                UPDATE users
                SET 
                username = $1,
                first_name = $2,
                last_name = $3,
                email = $4
                WHERE id = $5;
            `;
            pool.query(
                updateUserInfo,
                [username, firstName, lastName, email, id]
            );
            const userInfoQuery = await pool.query(
                `SELECT
                 id, username,
                first_name, last_name, 
                email, date_created 
                FROM users WHERE id = $1;`, [id]
            );
            res.send({
                "status": 200,
                "userInfo": userInfoQuery.rows
            });
        }
        catch (error) {
            console.log('register error:', error);
            res.sendStatus(500)
        };
    } else {
        console.log('token invalid');
        res.sendStatus(400)
    }
})

module.exports = router;