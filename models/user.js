var db = require('../config/db');

var userSchema = db.Schema({
  username: String,
  password: String,
});

// userSchema.pre('save', function(next) {
//
// });

var User = db.model('User', userSchema);
