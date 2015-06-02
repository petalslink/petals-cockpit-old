'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Bus Schema
 */
var BusSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true
	},
	version: {
		type: String,
		default: '',
		trim: true
	},
	ip: {
		type: String,
		default: '',
		trim: true
	},
	port: {
		type: Number,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

var Bus = mongoose.model('Bus', BusSchema);

// make this available to our users in our Node applications
module.exports = Bus;