var db = require('../config/db');

var userSchema = db.Schema({
  username: String,
  password: String,
});

// userSchema.pre('save', function(next) {
    this.username = username,
    this.password = password
// });

var User = db.model('User', userSchema);
