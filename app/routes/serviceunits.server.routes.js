'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var serviceunits = require('../controllers/serviceunits.server.controller');

	// Serviceunits Routes
	app.route('/serviceunits').put(users.requiresLogin, serviceunits.update)
		.post(users.requiresLogin, serviceunits.create)
		.get(users.requiresLogin, serviceunits.list);

	app.route('/serviceunits/:serviceunitId')
		.get(users.requiresLogin, serviceunits.read)
		.put(users.requiresLogin, serviceunits.update)
		.delete(users.requiresLogin, serviceunits.delete);

	// Finish by binding the Serviceunit middleware
	app.param('serviceunitId', serviceunits.serviceunitByID);
};
