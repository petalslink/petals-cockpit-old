'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var services = require('../../app/controllers/services.server.controller');

	// Services Routes
	app.route('/services')
		.get(services.list)
		.post(users.requiresLogin, services.create);

	app.route('/services/:serviceId')
		.get(services.read)
		.put(users.requiresLogin, services.hasAuthorization, services.update)
		.delete(users.requiresLogin, services.hasAuthorization, services.delete);

	// Finish by binding the Service middleware
	app.param('serviceId', services.serviceByID);
};
