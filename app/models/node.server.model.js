'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Node Schema
 */
var NodeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Node name',
		trim: true
	},
	ip: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Node', NodeSchema);