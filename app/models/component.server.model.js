'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Component Schema
 */
var ComponentSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Component name',
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

mongoose.model('Component', ComponentSchema);