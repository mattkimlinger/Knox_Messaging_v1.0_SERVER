// const expressjwt = require("express-jwt");
var jwt = require('jsonwebtoken');

const tokenValidation = (token) => {
  jwt.verify(token, 'secret', function(err, decoded) {
    console.log(decoded.userId);
    return decoded.userId;
  });
}
module.exports = tokenValidation;

// const jwtCheck = expressjwt({    
//     secret: "mykey"
//   });


// module.exports = jwtCheck;