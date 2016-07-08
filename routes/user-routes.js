var router = require('express').Router();

// CREATE a user
app.post('users', function(req, res) {
  res.json({
    msg: 'HOORAY!'
  });
});
module.exports = router;
