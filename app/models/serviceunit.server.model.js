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
		trim: true,
		required: 'Please fill Service Unit name'
	},
	parentComponent: {
		type: Schema.Types.ObjectId,
		ref: 'Component',
		required: 'Please fill Parent Component name'
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	state: {
		type: String,
		enum: [
			'Undeployed',
			'Deployed',
			'Stopped',
			'Started'
		],
		default: 'Undeployed'
	},
	services: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Service'
		}
	]
});

var Serviceunit = mongoose.model('Serviceunit', ServiceunitSchema);

/*var ServiceUnitDefault = new Serviceunit({
	name: 'SU-Achat',
	parentComponent: '',
	state: 'Undeployed'
});

ServiceUnitDefault.save(function (err, saved) {
	if (err) {
		console.log('Service Unit Default is already saved !', err);
	}
	if (saved) {
		console.log('Service Unit Default saved successfully !');
	}
	if (!saved) {
		console.log('GO Service Unit');
	}
});*/

// make this available to our users in our Node applications
module.exports = Serviceunit;