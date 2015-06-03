'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var components = require('../../app/controllers/components.server.controller');

	// Components Routes
	app.route('/components')
		.get(components.list)
		.post(users.requiresLogin, components.create);

	app.route('/components/:componentId')
		.get(components.read)
		.put(users.requiresLogin, components.hasAuthorization, components.update)
		.delete(users.requiresLogin, components.hasAuthorization, components.delete);

	// Finish by binding the Component middleware
	app.param('componentId', components.componentByID);
};
