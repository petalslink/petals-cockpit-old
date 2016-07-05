'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    created_at: {type: Date, default: Date.now}
});

module.exports = {
        User: mongoose.model('User', userSchema)
};
