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
	parentComponent: {
		type: Schema.Types.ObjectId,
		ref: 'Component'
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	services: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Service'
		}
	]
});

var Serviceunit = mongoose.model('Serviceunit', ServiceunitSchema);

var ServiceUnitDefault = new Serviceunit({
	name: 'SU-Achat'
});

ServiceUnitDefault.update(function (err, saved) {
	if (err) {
		console.log('Service Unit Default is already saved !', err);
	}
	if (saved) {
		console.log('Service Unit Default saved successfully !');
	}
	if (!saved) {
		console.log('GO Service Unit');
	}
});

// make this available to our users in our Node applications
module.exports = Serviceunit;