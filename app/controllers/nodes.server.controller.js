'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Node = mongoose.model('Node'),
	Bus = mongoose.model('Bus'),
	_ = require('lodash');

/**
 * Create a Node
 */
exports.create = function(req, res) {
	var node = new Node(req.body);
	node.user = req.user;

	node.save(function(err, savedNode) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			Bus.findById(node.parentBus).exec(function(err, bus) {
				if (err || !bus) {
					return res.status(400).send({
						message: 'Could not findById ParentBus' + err
					});
				} else {
					savedNode = savedNode.toJSON();
					savedNode.parentBus = bus;
					console.log('Key_Value', bus, savedNode);
					res.jsonp(savedNode);
				}
			});

		}
	});
};

/**
 * Show the current Node
 */
exports.read = function(req, res) {
	res.jsonp(req.node);
};

/**
 * Update a Node
 */
exports.update = function(req, res) {
	var node = req.node ;

	node = _.extend(node , req.body);

	node.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(node);
		}
	});
};

/**
 * Delete an Node
 */
exports.delete = function(req, res) {
	var node = req.node ;

	node.remove(function(err, deletedNode) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deletedNode);
		}
	});
};

/**
 * List of Nodes
 */
exports.list = function(req, res) {
	Node.find().sort('-created').populate('parentBus').exec(function(err, nodes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(nodes);
		}
	});
};

/**
 * Node middleware
 */
exports.nodeByID = function(req, res, next, id) { 
	Node.findById(id).populate('parentBus')
		.exec(function(err, node) {
		if (err) return next(err);
		if (! node) return next(new Error('Failed to load Node ' + id));
		req.node = node ;
		next();
	});
};

/**
 * Node authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.node.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
