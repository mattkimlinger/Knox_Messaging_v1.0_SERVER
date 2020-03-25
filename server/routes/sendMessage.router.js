const express = require('express');
const pool = require('../modules/pool');
const bodyParser = require('body-parser');
// const encryption = require('../modules/encryption');
const tokenValidation = require('../modules/tokenValidation')

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

router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const token = await body.token;
        // const tokenValidated = tokenValidation(token);
        console.log('tokenValidation(token): ', tokenValidation(token));
        
        const conversationId = body.conversationId;
        const userId = body.userId;
        const receiverId = body.receiverId;
        const message = body.message;
        const date = getCurrentDate();
        console.log('req.body', req.body);
        // let postMessage = `INSERT INTO messages ( conversation_id, receiver_id, sender_id, message, date_created, time_sent)
        // VALUES ( $1, $1, $1, $4, $5);`;
        // pool.query(
        //     postMessage,
        //     [conversationId, firstName, lastName, email, password, date]
        // );
        res.sendStatus(200);
    }
    catch (error) {
    console.log('register error:', error);
    res.sendStatus(500)
    };
})

module.exports = router;