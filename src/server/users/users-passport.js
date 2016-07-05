var passport = require('passport');
var User = require('../models/models').User;
var bCrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;

//serialization corresponds to going from a user to the information stored in the session cookie
passport.serializeUser(function(user, done) {
    console.log('serializing user:', user.username);
    done(null, user._id);
});

//this is the opposite operation
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        console.log('deserializing user:', user.username);
        done(err, user);
    });
});

passport.use('login', new LocalStrategy({
    passReqToCallback : true
}, function(req, username, password, done) {
    // check in mongo if a user with username exists or not
    User.findOne({
        'username' : username
    }, function(err, user) {
        // In case of any error, return using the done method
        if (err)
            return done(err);
        // Username does not exist, log the error and redirect back
        if (!user) {
            console.log('User Not Found with username ' + username);
            return done(null, false);
        }
        // User exists but wrong password, log the error
        if (!isValidPassword(user, password)) {
            console.log('Invalid Password');
            return done(null, false); // redirect back to login page
        }
        // User and password both match, return user from done method
        // which will be treated like success
        return done(null, user);
    });
}));

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}