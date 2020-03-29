const express = require('express');
const pool = require('../modules/pool');
const bodyParser = require('body-parser');
const encryption = require('../modules/encryption');

const router = express.Router();

router.use(bodyParser.json());

function getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    //January is 0!
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    console.log('getCurrentDate finished');
    return today;
}

router.post("/", (req, res) => {
    try {
        const username = req.body.username;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const passwordEntered = req.body.password;
        const date = getCurrentDate();
        
        
        const hashedPassword = encryption.hashPassword(passwordEntered);
        console.log('req.body', req.body);
        let postNewUser = `INSERT INTO "users" ("username", "first_name", "last_name", "email", "password", "date_created" ) VALUES ($1, $2, $3, $4, $5, $6);`;
        pool.query(
            postNewUser,
            [username, firstName, lastName, email, hashedPassword, date]
        );
        res.sendStatus(200);
    }
    catch (error) {
    console.log('register error:', error);
    res.sendStatus(500)
    };
})

module.exports = router;