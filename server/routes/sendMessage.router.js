const express = require('express');
const pool = require('../modules/pool');
const bodyParser = require('body-parser');
// const encryption = require('../modules/encryption');
const tokenValidation = require('../modules/tokenValidation')

const router = express.Router();

router.use(bodyParser.json());

router.post("/", async (req, res) => {
    const body = req.body;
    const token =  body.token;
    const tokenToId = await tokenValidation(token);
    const senderId = body.userId;
    if (tokenToId === senderId) {
        console.log('tokenValidation(token): ', tokenValidation(token));

        const conversationId = body.conversationId;
        const receiverId = body.receiverId;
        const message = body.message;
        console.log('req.body', req.body);
        const conversationCheck = `
            SELECT id 
            FROM conversations
            WHERE sender_id = $1
            AND receiver_id = $2
            OR receiver_id = $3
            AND sender_id = $4;
        `
        const existingConversationCheck = async () => {
            //Query to check if a conversation already exists
            return (
                await pool.query(
                    conversationCheck,
                    [
                        senderId, receiverId,
                        senderId, receiverId
                    ]
                )
            )
        }
        //if no conversations exist between these two users, create one
        if (!existingConversationCheck() || conversationId === 0 ) {
            try {
                const newConversation = `
                    INSERT INTO conversations ( receiver_id, sender_id, last_message)
                    VALUES ( $1, $2, $3);
                `;
                pool.query(
                    newConversation,
                    [receiverId, senderId, message]
                );
            } catch (error) {
                console.log('COULD NOT MAKE NEW CONVERSATION error: ', error);
                res.sendStatus(500)
            }
        }
        //if conversation exist between these two recipients,
        // update conversation and insert new message
        if (existingConversationCheck()) {

            try {

                const updateConversation = `
                UPDATE conversations
                SET receiver_id = $1,
                sender_id = $2,
                last_message = $3
                WHERE sender_id = $4
                AND receiver_id = $5
                OR receiver_id = $6
                ANd sender_id = $7;
                `;
                pool.query(
                    updateConversation,
                    [
                        receiverId, senderId, message,
                        senderId, receiverId, senderId, receiverId
                    ]
                );
                console.log('update conversation finsished');
                
                // res.sendStatus(200);
            } catch (error) {
                console.log('COULD NOT INSERT MESSAGE error: ', error);
                return res.sendStatus(500)
            }
            let messages = [];
            try {
                const postMessage = `
                    INSERT INTO messages 
                    ( conversation_id, sender_id, receiver_id, message)
                    VALUES ( $1, $2, $3, $4 );
                `;
                await pool.query(
                    postMessage,
                    [conversationId, senderId, receiverId, message]
                );
                const userMessagesQuery = await pool.query(
                    `SELECT *
                    FROM messages
                    WHERE receiver_id = $1  OR sender_id = $2 ORDER BY id DESC`,
                    [senderId, senderId]
                );
                const conversationsQuery = await pool.query(
                    `SELECT *
                    FROM conversations 
                    WHERE receiver_id = $1
                    OR sender_id = $2`,
                    [senderId, senderId]
                );
                const userData = {
                    // contacts: contactsQuery.rows,
                    userMessages: userMessagesQuery.rows,
                    conversations: conversationsQuery.rows
                };
                console.log('sendMessage: userdata: ', userData);
                res.send(
                    userData
                );
            } catch (error) {
                console.log('COULD NOT INSERT MESSAGE error: ', error);
                 return res.sendStatus(500)
            }
        }


    } else {
        console.log('Token Not Valid:', error);
        res.sendStatus(400)
    };
})

module.exports = router;