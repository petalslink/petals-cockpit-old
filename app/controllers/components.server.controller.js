'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Component = mongoose.model('Component'),
	_ = require('lodash');

/**
 * Create a Component
 */
exports.create = function(req, res) {
	var component = new Component(req.body);
	component.user = req.user;

	component.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(component);
		}
	});
};

/**
 * Show the current Component
 */
exports.read = function(req, res) {
	res.jsonp(req.component);
};

/**
 * Update a Component
 */
exports.update = function(req, res) {
	var component = req.component ;

	component = _.extend(component , req.body);

	component.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(component);
		}
	});
};

/**
 * Delete an Component
 */
exports.delete = function(req, res) {
	var component = req.component ;

	component.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(component);
		}
	});
};

/**
 * List of Components
 */
exports.list = function(req, res) { 
	Component.find().sort('-created').populate('component', 'name').exec(function(err, components) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(components);
		}
	});
};

/**
 * Component middleware
 */
exports.componentByID = function(req, res, next, id) { 
	Component.findById(id).populate('component', 'name')
		.exec(function(err, component) {
		if (err) return next(err);
		if (! component) return next(new Error('Failed to load Component ' + id));
		req.component = component ;
		next();
	});
};

/**
 * Component authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.component.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
