'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Service Schema
 */
var ServiceSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Service name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

var Service = mongoose.model('Service', ServiceSchema);

var ServiceDefault = new Service({
	name: 'S-Tools'
});

ServiceDefault.update(function (err, saved) {
	if (err) {
		console.log('Service Default is already saved !', err);
	}
	if (saved) {
		console.log('Service Default saved successfully !');
	}
	if (!saved) {
		console.log('GO Service');
	}
});

// make this available to our users in our Node applications
module.exports = Service;