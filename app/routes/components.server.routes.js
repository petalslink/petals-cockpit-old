'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var components = require('../../app/controllers/components.server.controller');

	// Components Routes
	app.route('/components').put(users.requiresLogin, components.update)
		.post(users.requiresLogin, components.create)
		.get(components.list);


	app.route('/components/:componentId')
		.get(components.read)
		.put(users.requiresLogin, components.update)
		.delete(users.requiresLogin, components.delete);

	// Finish by binding the Component middleware
	app.param('componentId', components.componentByID);
};
