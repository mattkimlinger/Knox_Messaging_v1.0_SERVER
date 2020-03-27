// const expressjwt = require("express-jwt");
var jwt = require('jsonwebtoken');

const tokenValidation = async (token) => {
  let id = 0;
  await jwt.verify(token, 'secret', function(err, decoded) {
    console.log('decoded.userId:', decoded.userId);
    id = decoded.userId;
    return;
  });
  return id;
}
module.exports = tokenValidation;

// const jwtCheck = expressjwt({    
//     secret: "mykey"
//   });


// module.exports = jwtCheck;