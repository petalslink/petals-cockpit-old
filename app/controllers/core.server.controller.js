'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

// Send an email when the contact from is submitted
exports.sendMail = function(req, res) {

};

