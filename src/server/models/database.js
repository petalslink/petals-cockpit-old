var mongoose = require('mongoose');
var environment = process.env.NODE_ENV;
var configDB = require('../config/db'); // get db config file
var dbURI = configDB.database;
var bCrypt = require('bcrypt-nodejs');

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
var models = require('./models');

function addUser(req, username, password, done) {

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

    // find a user in mongo with provided username
    models.User.findOne({ 'username' :  username }, function(err, user) {
        // In case of any error, return using the done method
        if (err){
            console.log('Error in SignUp: '+err);
            return done(err);
        }
        // already exists
        if (user) {
            console.log('User already exists with username: '+username);
            return done(null, false);
        } else {
            // if there is no user, create the user
            var newUser = new models.User();

            // set the user's local credentials
            newUser.username = username;
            newUser.password = createHash(password);

            // save the user
            newUser.save(function(err) {
                if (err){
                    console.log('Error in Saving user: '+err);
                    throw err;
                }
                console.log(newUser.username + ' Registration successful');
                return done(null, newUser);
            });
        }
    });
}

module.exports.addUser = addUser;