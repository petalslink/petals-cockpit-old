'use strict';

var mongoose = require('mongoose');
/*var passportLocalMongoose = require('passport-local-mongoose');*/
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    created_at: {type: Date, default: Date.now}
});

/*User.plugin(passportLocalMongoose);*/

module.exports = mongoose.model('User', userSchema);
