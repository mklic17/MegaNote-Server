var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (isPreflight(req) || isLoggingInOrSigningUp(req)) {
    next();
    return;
  }


  // verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
    if (err) {
      res.status(401).json({ message: 'Authentication required.' });
      return;
    }

    // find the user
    User
    .findOne({ _id: decodedPayload._id })
    .then(
      user => {
        if(user) {
          // add the user to the request
          req.user = user;
          next();
        }
        else {
          // user was not found
          res.status(401).json({ message: 'Authentication required.' });
        }
      }
    );
  });
}

function isPreflight(req) {
  return (req.method.toLowerCase() === 'options');
}

function isLoggingInOrSigningUp(req) {
  if (req.method.toLowerCase() !== 'post') {
    return false;
  }
  const loggingIn = req.originalUrl.includes('sessions');
  const signingUp = req.originalUrl.includes('users');
  return (loggingIn || signingUp);
}
