var router = require('express').Router();
var User = require('../models/user');


// CREATE a user
app.post('users', function(req, res) {
  var user = new User({
      name: req.body.user.name,
      username: req.body.user.username,
  });
  user
    .save()
    .then(
      userData => res.json(userData)
    );
});
module.exports = router;
