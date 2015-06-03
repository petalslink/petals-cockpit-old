'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var serviceassemblies = require('../../app/controllers/serviceassemblies.server.controller');

	// Serviceassemblies Routes
	app.route('/serviceassemblies')
		.get(serviceassemblies.list)
		.post(users.requiresLogin, serviceassemblies.create);

	app.route('/serviceassemblies/:serviceassemblyId')
		.get(serviceassemblies.read)
		.put(users.requiresLogin, serviceassemblies.hasAuthorization, serviceassemblies.update)
		.delete(users.requiresLogin, serviceassemblies.hasAuthorization, serviceassemblies.delete);

	// Finish by binding the Serviceassembly middleware
	app.param('serviceassemblyId', serviceassemblies.serviceassemblyByID);
};
