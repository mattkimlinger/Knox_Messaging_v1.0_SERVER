const express = require('express');
const pool = require('../modules/pool');
const bodyParser = require('body-parser');
const encryption = require('../modules/encryption');

const router = express.Router();

router.use(bodyParser.json());

function getCurrentDate () {
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
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const date = getCurrentDate();
    const password = encryption.hashPassword(req.body.password);
  

    console.log('req.body', req.body);
    res.sendStatus(200);
    let postNewUser = `INSERT INTO "users" ("username", "first_name", "last_name", "email", "password", "date_created" ) VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(
        postNewUser,
        [username, firstName, lastName, email, password, date]
    ).then((response) => {
        console.log('registerUser query response:', response)
        res.sendStatus(500)
    }).catch((error) => {
        console.log('register error:', error);
    });
})

module.exports = router;