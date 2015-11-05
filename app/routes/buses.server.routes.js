'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var buses = require('../controllers/buses.server.controller.js');

	// Buses Routes
	app.route('/buses').put(users.requiresLogin, buses.update)
		.post(users.requiresLogin, buses.create)
		.get(users.requiresLogin, buses.list);

	app.route('/buses/:busId')
		.get(users.requiresLogin, buses.read)
		.put(users.requiresLogin, buses.update)
		.delete(users.requiresLogin, buses.delete);

	// Finish by binding the Bus middleware
	app.param('busId', buses.busByID);
};
