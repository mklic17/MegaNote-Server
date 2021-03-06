var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

// login
router.post('/', (req, res) => {
  User
    .findOne({
      username: req.body.user.username
    })
    .then(
      user => {
        return user.authenticate(req.body.user.password)
      }
    )
    .then(
      user => {
        // correct password
        var token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET,
          {
          expiresIn: 60*60*24
        });
        res.json({
          user,
          authToken: token
        });
      },
      (err) => {
        res.status(401).json({ message });

      }
    );
});
 // double check the closures
module.exports = router;
