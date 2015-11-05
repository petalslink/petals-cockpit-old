'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var services = require('../controllers/services.server.controller');

	// Services Routes
	app.route('/services').put(users.requiresLogin, services.update)
		.get(users.requiresLogin, services.list)
		.post(users.requiresLogin, services.create);

	app.route('/services/:serviceId')
		.get(users.requiresLogin, services.read)
		.put(users.requiresLogin, services.update)
		.delete(users.requiresLogin, services.delete);

	// Finish by binding the Service middleware
	app.param('serviceId', services.serviceByID);
};
