'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');

	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);
};