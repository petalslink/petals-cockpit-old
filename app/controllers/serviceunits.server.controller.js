'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Serviceunit = mongoose.model('Serviceunit'),
	Component = mongoose.model('Component'),
	_ = require('lodash');

/**
 * Create a Serviceunit
 */
exports.create = function(req, res) {
	var serviceunit = new Serviceunit(req.body);
	serviceunit.user = req.user;

	serviceunit.save(function(err, savedServiceunit) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			Component.findById(serviceunit.parentComponent).exec(function(err, component) {
				if (err || !component) {
					return res.status(400).send({
						message: 'Could not findById parentComponent' + err
					});
				} else {
					savedServiceunit = savedServiceunit.toJSON();
					savedServiceunit.parentComponent = component;
					console.log('Key_Value', component, savedServiceunit);
					res.jsonp(savedServiceunit);
				}
			});

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
	Serviceunit.find().sort('-created').populate('parentComponent').exec(function(err, serviceunits) {
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
	Serviceunit.findById(id).populate('parentComponent')
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
