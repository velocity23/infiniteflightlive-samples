'use strict';
// Libs
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Include Routes
var index = require('./routes/index');
var sessions = require('./routes/sessions');
var flights = require('./routes/flights');
var atc = require('./routes/atc');
var users = require('./routes/users');
var help = require('./routes/help');

// Initialize Express
var app = express();

// If you plan to call this API on the frontend, put your domain below to avoid CORS errors. For example, "https://infiniteflight.com".
// Leave this empty if you are only making server-side requests
process.env.CORS_DOMAIN = "";

// Set Up Express
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Up Routes
app.use('/', index);
app.use('/sessions', sessions);
app.use('/flights', flights);
app.use('/atc', atc);
app.use('/users', users);
app.use('/help', help);

// 404 Page
app.use(function (req, res, next) {
    res.status(404);
    res.contentType("application/json");

    let data = JSON.stringify({
        "error": 404,
        "text": "Not Found"
    });
    res.write(data);
    res.end();
});

// Set Port. Default is 3000.
app.set('port', process.env.PORT || 3000);

// Start Server and Log Confirmation
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});