'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Bus = mongoose.model('Bus'),
	_ = require('lodash');

/**
 * Create a Bus
 */
exports.create = function(req, res) {
	var bus = new Bus(req.body);
	bus.user = req.user;

	bus.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bus);
		}
	});
};

/**
 * Show the current Bus
 */
exports.read = function(req, res) {
	res.jsonp(req.bus);
};

/**
 * Update a Bus
 */
exports.update = function(req, res) {
	var bus = req.bus ;

	bus = _.extend(bus , req.body);

	bus.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bus);
		}
	});
};

/**
 * Delete an Bus
 */
exports.delete = function(req, res) {
	var bus = req.bus ;

	bus.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bus);
		}
	});
};

/**
 * List of Buses
 */
exports.list = function(req, res) { 
	Bus.find().sort('-created').populate('bus', 'name').exec(function(err, buses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(buses);
		}
	});
};

/**
 * Bus middleware
 */
exports.busByID = function(req, res, next, id) {
	Bus.findById(id).populate('bus', 'name')
		.exec(function(err, bus) {
		if (err) return next(err);
		if (! bus) return next(new Error('Failed to load Bus ' + id));
		req.bus = bus ;
		next();
	});
};
/*exports.busByID = function(req, res, next, id) {
	Bus.findOne({
		_id: id
	}).exec(function(err, bus) {
		if (err) return next(err);
		if (!bus) return next(new Error('Failed to load Bus ' + id));
		req.bus = bus;
		next();
	});
};*/

/**
 * Bus authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.bus.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
