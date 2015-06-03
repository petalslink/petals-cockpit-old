'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Serviceunit Schema
 */
var ServiceunitSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Service Unit name',
		trim: true
	},
	states: {
		type: [{
			type: String,
			enum: ['unknown',
				'started',
				'stopped',
				'shutdown'
			]
		}],
		default: ['unknown']
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

mongoose.model('Serviceunit', ServiceunitSchema);