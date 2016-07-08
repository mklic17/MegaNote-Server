require('dotenv').load();

var express = require('express');
var bodyParser = require('body-parser');
var noteRoutes = require('./routes/note-routes');

var app = express();

//Middleware
app.use(function(req, res, next){
    // Allow CORS
  res.header('Access-Control-Allow-Origin', '*');

  // ALlow Content-Type header (for JSON payloads)
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //Allow more HTTP verbs
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');

  // Continue Processing the request
  next();
});

// Body parsing for JSON Post/PUT payloads
app.use(bodyParser.json());

// Routes
app.use('/api/v1/notes', noteRoutes);

// CREATE a user
app.post('/users', function(req, res) {
  res.json({
    msg: 'HOORAY!'
  });
});


app.listen(3030, function() {
// console.log('DB: ' + process.env.DB_URI);
  console.log('Listening on http://localhost:3030...');
});
