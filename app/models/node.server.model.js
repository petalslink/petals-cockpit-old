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
	updated: {
		type: Date,
		default: Date.now
	},
	components: [
		{
			type: Schema.ObjectId,
			ref: 'Component'
		}
	]
});

var Node = mongoose.model('Node', NodeSchema);

var NodeDefault = new Node({
	name: 'start-facturation',
	ip: '10.3.44.5'
});

NodeDefault.update(function (err, saved) {
	if (err) {
		console.log('Node Default is already saved !', err);
	}
	if (saved) {
		console.log('Node Default saved successfully !');
	}
	if (!saved) {
		console.log('GO Node');
	}
});

// make this available to our users in our Node applications
module.exports = Node;