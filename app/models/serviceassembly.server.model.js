'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Serviceassembly Schema
 */
var ServiceassemblySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Service Assembly name',
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
		default: ['unkwnon']
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

mongoose.model('Serviceassembly', ServiceassemblySchema);