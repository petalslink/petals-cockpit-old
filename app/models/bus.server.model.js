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
	nodes: [
		{
			type: Schema.ObjectId,
			ref: 'Node'
		}
	]
});

var Bus = mongoose.model('Bus', BusSchema);

var BusDefault = new Bus({
	name: 'BUS-RH Domain',
	version: 'Petals 3',
	ip: '192.168.168.10',
	port: '2024'
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