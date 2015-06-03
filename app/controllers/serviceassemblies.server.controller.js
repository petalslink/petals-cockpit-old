'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Serviceassembly = mongoose.model('Serviceassembly'),
	_ = require('lodash');

/**
 * Create a Serviceassembly
 */
exports.create = function(req, res) {
	var serviceassembly = new Serviceassembly(req.body);
	serviceassembly.user = req.user;

	serviceassembly.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(serviceassembly);
		}
	});
};

/**
 * Show the current Serviceassembly
 */
exports.read = function(req, res) {
	res.jsonp(req.serviceassembly);
};

/**
 * Update a Serviceassembly
 */
exports.update = function(req, res) {
	var serviceassembly = req.serviceassembly ;

	serviceassembly = _.extend(serviceassembly , req.body);

	serviceassembly.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(serviceassembly);
		}
	});
};

/**
 * Delete an Serviceassembly
 */
exports.delete = function(req, res) {
	var serviceassembly = req.serviceassembly ;

	serviceassembly.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(serviceassembly);
		}
	});
};

/**
 * List of Serviceassemblies
 */
exports.list = function(req, res) { 
	Serviceassembly.find().sort('-created').populate('serviceassembly', 'name').exec(function(err, serviceassemblies) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(serviceassemblies);
		}
	});
};

/**
 * Serviceassembly middleware
 */
exports.serviceassemblyByID = function(req, res, next, id) { 
	Serviceassembly.findById(id).populate('serviceassembly', 'name').exec(function(err, serviceassembly) {
		if (err) return next(err);
		if (! serviceassembly) return next(new Error('Failed to load Service Assembly ' + id));
		req.serviceassembly = serviceassembly ;
		next();
	});
};

/**
 * Serviceassembly authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.serviceassembly.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
