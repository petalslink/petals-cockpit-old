'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Serviceunit = mongoose.model('Serviceunit'),
	_ = require('lodash');

/**
 * Create a Serviceunit
 */
exports.create = function(req, res) {
	var serviceunit = new Serviceunit(req.body);
	serviceunit.user = req.user;

	serviceunit.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(serviceunit);
		}
	});
};

/**
 * Show the current Serviceunit
 */
exports.read = function(req, res) {
	res.jsonp(req.serviceunit);
};

/**
 * Update a Serviceunit
 */
exports.update = function(req, res) {
	var serviceunit = req.serviceunit ;

	serviceunit = _.extend(serviceunit , req.body);

	serviceunit.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(serviceunit);
		}
	});
};

/**
 * Delete an Serviceunit
 */
exports.delete = function(req, res) {
	var serviceunit = req.serviceunit ;

	serviceunit.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(serviceunit);
		}
	});
};

/**
 * List of Serviceunits
 */
exports.list = function(req, res) { 
	Serviceunit.find().sort('-created').populate('serviceunit', 'name').exec(function(err, serviceunits) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(serviceunits);
		}
	});
};

/**
 * Serviceunit middleware
 */
exports.serviceunitByID = function(req, res, next, id) { 
	Serviceunit.findById(id).populate('serviceunit', 'name')
		.exec(function(err, serviceunit) {
		if (err) return next(err);
		if (! serviceunit) return next(new Error('Failed to load Service Unit ' + id));
		req.serviceunit = serviceunit ;
		next();
	});
};

/**
 * Serviceunit authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.serviceunit.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
