var mongoose = require('mongoose');
var environment = process.env.NODE_ENV;
var configDB = require('../config/db'); // get db config file
var dbURI = configDB.database;

mongoose.connect(environment || dbURI, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the petals_cockpit_db');
    }
});

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

// BRING IN YOUR SCHEMAS & MODELS
require('./models');
