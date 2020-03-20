const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../modules/pool');
const router = express.Router();
const jsonWebToken = require('jsonwebtoken');
const hashScripts = require('../modules/encryption');
router.use(bodyParser.json());

router.post('/login', async (req, res) => {
    console.log('login/login router hit');
    const usernameEntered = req.body.username;
    const passwordEntered = req.body.password;
    const hashedPassword = hashScripts.hashPassword(req.body.password);
    console.log('usernameEntered:', usernameEntered, 'password:', hashedPassword)

    if (!usernameEntered || !passwordEntered) {
        res.status(400).send("Error, Username or password not supplied");
        return;
    }
    const query = `SELECT "id", "username", "password" FROM "users" WHERE "username" = '${usernameEntered}'`
    const usernameSearch = await pool.query(query)
    if (!usernameSearch ||
        !usernameSearch.rows ||
        !usernameSearch.rows[0] ||
        !usernameSearch.rows[0].password
    ) {
        console.log('No Usernames found');
        res.sendStatus(401, '{"error" : "No Usernames found"}');
        return
    }
    let userId = usernameSearch.rows[0].id;
    let username = usernameSearch.rows[0].username;
    let storedPassword = usernameSearch.rows[0].password;
    let match = hashScripts.comparePassword(passwordEntered, storedPassword)
    if (!match) {
        console.log('incorrect password')
        res.status(401).send('{"errorMessage":"Password is incorrect."}');
        return;
    }
    const token = jsonWebToken.sign({
        sub: userId,
        username: username
    }, "userKey", { expiresIn: "3 hours" });
    res.status(200).send({ 
        access_token: token 
        }).catch((error) => {
            console.log('login GET users error:'.error)
        })
})

module.exports = router;