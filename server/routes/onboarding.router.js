const express = require('express');
// const pool = require('../modules/pool');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const FormData = require('form-data');
const axios = require('axios');
const exampleImage = require('./exampleImage');

router.post('/onboarding', async (req, res) => {
    // const formData = req.body;
    // console.log('form data', formData.image);


    console.log('req.body', req.body);
    

    // const formData = new FormData();
    // await formData.append("image", image);
    // console.log('formData', formData)
    // await axios.post('https://api.imgur.com/3/upload',
    //     {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             "Authorization": ["Client-ID fa7a27f208d213b", "Bearer 9d6fd72586a8c8e27606ad92f8de3072e5d6a236"],
    //             "Content-Type": "multipart/form-data"
    //         },
    //         data: formData,
    //     }
    // ).then((response) => {
    //     console.log('response.data', response);
    // }).catch((error) => {
    //     console.log('error', error);
    // })


    // res.sendStatus(200);
});

module.exports = router;





/** 
 * 
 * TEST
 * 
*/
const formData = new FormData();
formData.append("image", exampleImage);
console.log('formData', formData)

axios.defaults.headers.common = { 'Authorization': `Bearer 9d6fd72586a8c8e27606ad92f8de3072e5d6a236` }

axios(
    {
        url: 'https://api.imgur.com/3/upload',
        method: 'POST',
        headers: {
            "Authorization": 'Client-ID fa7a27f208d213b',
            // "Content-Type": 'multipart/form-data;',
        },
        body: {
           "image": formData
        }
    }
).then((response) => {
    console.log('response.data', response.data);
}).catch((error) => {
    console.log('error', error);
})