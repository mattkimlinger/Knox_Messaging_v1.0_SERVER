const express = require('express');
const pool = require('../modules/pool');
const bodyParser = require('body-parser');
// const encryption = require('../modules/encryption');
const tokenValidation = require('../modules/tokenValidation')
const router = express.Router();
router.use(bodyParser.json());

router.delete("/", async (req, res) => {
    const body = req.body;
    const userId = body.userId;
    const token = body.token;
    const tokenToId = await tokenValidation(token);
    if (tokenToId === userId) {
        console.log('tokenValidation(token): ', tokenValidation(token));
        const conversationId = body.conversationId;
        console.log('req.body', req.body);
        const deleteConversation = `
        DELETE 
        FROM conversations AS c
        WHERE c.id = $1;`
        const deleteMessages = `
        DELETE
        FROM messages as m
        WHERE m.conversation_id = $1;`
        try {
            pool.query(deleteConversation, [conversationId]);
            pool.query(deleteMessages, [conversationId]);
            res.sendStatus(200);
        } catch (error) {
            console.log(' delete query error: ', error);
            res.sendStatus(500);
        }
    } else {
        console.log('Token Not Valid:', error);
        res.sendStatus(400);
    };
})
module.exports = router;