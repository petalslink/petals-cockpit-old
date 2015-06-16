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
	updated: {
		type: Date,
		default: Date.now
	},
	serviceUnits: [
		{
			type: Schema.ObjectId,
			ref: 'Serviceunit'
		}
	]
});

var Component = mongoose.model('Component', ComponentSchema);

var ComponentDefault = new Component({
	name: 'start-facturation'
});

ComponentDefault.update(function (err, saved) {
	if (err) {
		console.log('Component Default is already saved !', err);
	}
	if (saved) {
		console.log('Component Default saved successfully !');
	}
	if (!saved) {
		console.log('GO Component');
	}
});

// make this available to our users in our Node applications
module.exports = Component;