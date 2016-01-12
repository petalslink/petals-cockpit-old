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
		trim: true,
		required: 'Please fill bus name'
	},
	version: {
		type: String,
		default: '',
		trim: true,
		required: 'Please fill bus version'
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	nodes: [
		{
			type: Schema.ObjectId,
			ref: 'Node'
		}
	]
});

var Bus = mongoose.model('Bus', BusSchema);

var BusDefault = new Bus({
	name: 'BUS Default',
	version: 'Petals Default'
});

BusDefault.update(function (err, saved) {
	if (err) {
		console.log('Bus Default is already saved !', err);
	}
	if (saved) {
		console.log('Bus Default saved successfully !');
	}
	if (!saved) {
		console.log('GO Bus');
	}
});

// make this available to our users in our Node applications
module.exports = Bus;