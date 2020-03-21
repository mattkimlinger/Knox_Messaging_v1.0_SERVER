const express = require('express');
// const pool = require('../modules/pool');
const router = express.Router();
// Allow for formdata
const multer = require('multer');
const upload = multer();
// const FormData = require('form-data');
const axios = require('axios');
const subscriptionKey = `${process.env.AZURE_SUBSCRIPTION_KEY}`;
// const exampleImage = require('./exampleImage');
router.post('/faceDetect', upload.none(), (req, res) => {
    // const formData = req.body;
    console.log('req.data', req.data);
    // axios(
    //     {
    //         url: `https://Knox.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_02&returnRecognitionModel=false&detectionModel=detection_01&Host=Knox.cognitiveservices.azure.com&Content-Type=application/json&Ocp-Apim-Subscription-Key=${subscriptionKey}`,
    //         method: 'POST',
    //         "headers": {
    //             "Content-Type": "application/json",
    //             "Ocp-Apim-Subscription-Key": "${subscriptionKey}",
    //             "Host": "Knox.cognitiveservices.azure.com"
    //         },
    //         "data": JSON.stringify({
    //             "url": "https://files.thehandbook.com/uploads/2017/05/johnny-depp-2016-1200x1256.jpg"
    //         }),
    //     }
    
    // ).then((response) => {
    //     console.log('response.data', response.data);
    // }).catch((error) => {
    //     console.log('error', error);
    // })
    // res.sendStatus(200);
}
);

module.exports = router;


// axios(
//     {
//         url: `https://Knox.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_02&returnRecognitionModel=false&detectionModel=detection_01&Host=Knox.cognitiveservices.azure.com&Content-Type=application/json&Ocp-Apim-Subscription-Key=${subscriptionKey}`,
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
//         "data": JSON.stringify({
//             "url": "https://files.thehandbook.com/uploads/2017/05/johnny-depp-2016-1200x1256.jpg"
//         }),
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
