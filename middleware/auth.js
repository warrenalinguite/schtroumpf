const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");

module.exports = (req, res, next) => {
 try {
   const token = req.headers.authorization.split(' ')[1];
    //const token = req.headers["x-access-token"];
    const decodedToken = jwt.verify(token, config.secret.secret);
    const userId = decodedToken.userId;
    req.auth = { userId };  
    if (req.auth.userId && req.auth.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
     error: new Error('Invalid request!')
    });
  }
};

//module.exports = (req, res, next) => {
  
 // let token = req.headers.authorization.split(' ')[1];

 // if (!token) {
  //  return res.status(403).send({ message: "No token provided!" });
 // }

 // jwt.verify(token, config.secret, (err, decoded) => {
  //  if (err) {
 //     return res.status(401).send({ message: "Unauthorized!" });
  //  }
  //  req.userId = decoded.id;
   // re
   // next();
 // });
//};