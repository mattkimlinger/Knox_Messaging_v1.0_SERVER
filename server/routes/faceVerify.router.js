const express = require('express');

// const pool = require('../modules/pool');
const router = express.Router();
// const multer = require('multer');
// const upload = multer();
// const FormData = require('form-data');
const axios = require('axios');
// const exampleImage = require('./exampleImage');

const contentType = 'application/json';
const subscriptionKey = `${process.env.AZURE_SUBSCRIPTION_KEY}`;
const host = 'Knox.cognitiveservices.azure.com';



//UNCOMMENT BELOW

// router.post('/faceVerify', async (req, res) => {
//     console.log('faceVerify router hit');

//     // const formData = req.body;
//     await axios(
//         {
//             url: `https://Knox.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_02&returnRecognitionModel=false&detectionModel=detection_01&Host=${host}&Content-Type=${contentType}&Ocp-Apim-Subscription-Key=${subscriptionKey}`,
//             method: 'POST',
//             // params: {
//             //     returnFaceId: true,
//             //     returnFaceLandmarks: false,
//             //     //returnFaceAttributes:true
//             //     recognitionModel: recognition_02,
//             //     returnRecognitionModel: false,
//             //     detectionModel: detection_01,
//             //     Host: Knox.cognitiveservices.azure.com,
//             //     Content-Type: application/ json,
//             //     Ocp-Apim-Subscription-Key: `${subscriptionKey}`
//             // },
//             "data": JSON.stringify({
//                 "faceId": "5e71e51f-44c0-4aee-89c0-3914bad97087",
//                 "personId": "501f3f32-d3b7-45eb-82b5-7db3f52aafbc",
//                 "personGroupId": "users"
//             }),
//         }

//     ).then((response) => {
//         // console.log('response.data', response.data);
//     }).catch((error) => {
//         console.log('error', error);
//     })
//     res.sendStatus(200);
// });

module.exports = router;




// const contentType = 'application/json';
//     const subscriptionKey = `${process.env.AZURE_SUBSCRIPTION_KEY}`;
//     const host = 'Knox.cognitiveservices.azure.com';
// console.log('subscriptionKey: ', subscriptionKey);

// axios(
//     {
//         method: 'POST',
//         url: `/face/v1.0/verify?Host=${host}&Content-Type=${contentType}&Ocp-Apim-Subscription-Key=${subscriptionKey}`,
//         // params: {
//         //     returnFaceId: true,
//         //     returnFaceLandmarks: false,
//         //     //returnFaceAttributes:true
//         //     recognitionModel: recognition_02,
//         //     returnRecognitionModel: false,
//         //     detectionModel: detection_01,
//         //     Host: Knox.cognitiveservices.azure.com,
//         //     Content-Type: application/ json,
//         //     Ocp-Apim-Subscription-Key: ${subscriptionKey}
//         // },
//         // "headers": {
//         //     "Content-Type": "application/json",
//         //     "Ocp-Apim-Subscription-Key": `${subscriptionKey}`,
//         //     "Host": "Knox.cognitiveservices.azure.com"
//         //   },
//         "body": JSON.stringify({
//             "faceId": "38a7f038-bc24-4829-98f7-7b37d8184763",
//             "personId": "501f3f32-d3b7-45eb-82b5-7db3f52aafbc",
//             "personGroupId": "users"
//         })
//     }

// ).then((response) => {
//     console.log('response', response.data);
// }).catch((error) => {
//     console.log('error', error);
// })



////**** WORKING AXIOS REQUEST BELOW */

// axios(
//     {x
//         url: 'https://Knox.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_02&returnRecognitionModel=false&detectionModel=detection_01&Host=Knox.cognitiveservices.azure.com&Content-Type=application/json&Ocp-Apim-Subscription-Key=${subscriptionKey}',
//         method: 'POST',
//         // params: {
//         //     returnFaceId: true,
//         //     returnFaceLandmarks: false,
//         //     //returnFaceAttributes:true
//         //     recognitionModel: recognition_02,
//         //     returnRecognitionModel: false,
//         //     detectionModel: detection_01,
//         //     Host: Knox.cognitiveservices.azure.com,
//         //     Content-Type: application/ json,
//         //     Ocp-Apim-Subscription-Key: ${subscriptionKey}
//         // },
//         "headers": {
//             "Content-Type": "application/json",
//             "Ocp-Apim-Subscription-Key": "${subscriptionKey}",
//             "Host": "Knox.cognitiveservices.azure.com"
//         },
//         "data": JSON.stringify({ "url": "https://files.thehandbook.com/uploads/2017/05/johnny-depp-2016-1200x1256.jpg" }),
//     }

// ).then((response) => {
//     console.log('response.data', response.data);
// }).catch((error) => {
//     console.log('error', error);
// })




/**
 *
 * TEST
 *
*/
