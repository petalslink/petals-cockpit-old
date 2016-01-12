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
	parentServiceunit: {
		type: Schema.Types.ObjectId,
		ref: 'Serviceunit',
		required: 'Please fill Parent Service Unit name'
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
			'Uninstalled',
			'Deployed',
			'Stopped',
			'Started'
		],
		default: 'Uninstalled'
	}
});

var Service = mongoose.model('Service', ServiceSchema);

/*var ServiceDefault = new Service({
	name: 'S-Tools',
	parentServiceunit: '',
	state: 'Uninstalled'
});

ServiceDefault.save(function (err, saved) {
	if (err) {
		console.log('Service Default is already saved !', err);
	}
	if (saved) {
		console.log('Service Default saved successfully !');
	}
	if (!saved) {
		console.log('GO Service');
	}
});*/

// make this available to our users in our Node applications
module.exports = Service;