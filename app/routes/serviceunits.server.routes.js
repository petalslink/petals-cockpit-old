'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var serviceunits = require('../../app/controllers/serviceunits.server.controller');

	// Serviceunits Routes
	app.route('/serviceunits').put(users.requiresLogin, serviceunits.update)
		.get(serviceunits.list)
		.post(users.requiresLogin, serviceunits.create);

	app.route('/serviceunits/:serviceunitId')
		.get(serviceunits.read)
		.put(users.requiresLogin, serviceunits.update)
		.delete(users.requiresLogin, serviceunits.delete);

	// Finish by binding the Serviceunit middleware
	app.param('serviceunitId', serviceunits.serviceunitByID);
};
