'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Service = mongoose.model('Service'),
	Serviceunit = mongoose.model('Serviceunit'),
	_ = require('lodash');

/**
 * Create a Service
 */
exports.create = function(req, res) {
	var service = new Service(req.body);
	service.user = req.user;

	service.save(function(err, savedService) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			Serviceunit.findById(service.parentServiceunit).exec(function(err, serviceunit) {
				if (err || !serviceunit) {
					return res.status(400).send({
						message: 'Could not findById parentServiceunit' + err
					});
				} else {
					savedService = savedService.toJSON();
					savedService.parentServiceunit = serviceunit;
					console.log('Key_Value', serviceunit, savedService);
					res.jsonp(savedService);
				}
			});

		}
	});
};

/**
 * Show the current Service
 */
exports.read = function(req, res) {
	res.jsonp(req.service);
};

/**
 * Update a Service
 */
exports.update = function(req, res) {
	var service = req.service ;

	service = _.extend(service , req.body);

	service.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(service);
		}
	});
};

/**
 * Delete an Service
 */
exports.delete = function(req, res) {
	var service = req.service ;

	service.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(service);
		}
	});
};

/**
 * List of Services
 */
exports.list = function(req, res) { 
	Service.find().sort('-created').populate('parentServiceunit').exec(function(err, services) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(services);
		}
	});
};

/**
 * Service middleware
 */
exports.serviceByID = function(req, res, next, id) {
	Service.findById(id).populate('parentServiceunit')
		.exec(function(err, service) {
			if (err) return next(err);
			if (! service) return next(new Error('Failed to load Service ' + id));
			req.service = service ;
			next();
		});
};

/**
 * Service authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.service.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
