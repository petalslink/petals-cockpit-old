'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var nodes = require('../../app/controllers/nodes.server.controller');

	// Nodes Routes
	app.route('/nodes')
		.get(nodes.list)
		.post(users.requiresLogin, nodes.create);

	app.route('/nodes/:nodeId')
		.get(nodes.read)
		.put(users.requiresLogin, nodes.hasAuthorization, nodes.update)
		.delete(users.requiresLogin, nodes.hasAuthorization, nodes.delete);

	// Finish by binding the Node middleware
	app.param('nodeId', nodes.nodeByID);
};
