
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
// const sessionMiddleware = require('./modules/session-middleware');

// const onBoardingRouter = require('./routes/onboarding.router');
const faceDetect = require('./routes/faceDetect.router');
const faceVerify = require('./routes/faceVerify.router');
const loginRouter = require('./routes/login.router');
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '200MB',
  extended: true
}));

/* Routes */
// app.use('/api', onBoardingRouter);
app.use('/login', loginRouter);
// app.use('/api', faceDetect);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = 3000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});