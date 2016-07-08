require('dotenv').load();

var express = require('express');
var bodyParser = require('body-parser');
var noteRoutes = require('./routes/note-routes');
var headersMiddleware = require('./middleware/headers');
var userRoutes = require('./routes/user-routes');


var app = express();

//Middleware
app.use(headersMiddleware);

// Body parsing for JSON Post/PUT payloads
app.use(bodyParser.json());

// Routes
app.use('/api/v1/notes', noteRoutes);
app.use('/api/v1/users', userRoutes);



app.listen(3030, function() {
// console.log('DB: ' + process.env.DB_URI);
  console.log('Listening on http://localhost:3030...');
});
