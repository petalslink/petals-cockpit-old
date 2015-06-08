'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	_Node = mongoose.model('_Node'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, node;

/**
 * Node routes tests
 */
describe('Node CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Node
		user.save(function() {
			node = {
				name: 'Node Name'
			};

			done();
		});
	});

	it('should be able to save Node instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Node
				agent.post('/nodes')
					.send(node)
					.expect(200)
					.end(function(nodeSaveErr, nodeSaveRes) {
						// Handle Node save error
						if (nodeSaveErr) done(nodeSaveErr);

						// Get a list of Nodes
						agent.get('/nodes')
							.end(function(nodesGetErr, nodesGetRes) {
								// Handle Node save error
								if (nodesGetErr) done(nodesGetErr);

								// Get Nodes list
								var nodes = nodesGetRes.body;

								// Set assertions
								(nodes[0].user._id).should.equal(userId);
								(nodes[0].name).should.match('Node Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Node instance if not logged in', function(done) {
		agent.post('/nodes')
			.send(node)
			.expect(401)
			.end(function(nodeSaveErr, nodeSaveRes) {
				// Call the assertion callback
				done(nodeSaveErr);
			});
	});

	it('should not be able to save Node instance if no name is provided', function(done) {
		// Invalidate name field
		node.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Node
				agent.post('/nodes')
					.send(node)
					.expect(400)
					.end(function(nodeSaveErr, nodeSaveRes) {
						// Set message assertion
						(nodeSaveRes.body.message).should.match('Please fill Node name');
						
						// Handle Node save error
						done(nodeSaveErr);
					});
			});
	});

	it('should be able to update Node instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Node
				agent.post('/nodes')
					.send(node)
					.expect(200)
					.end(function(nodeSaveErr, nodeSaveRes) {
						// Handle Node save error
						if (nodeSaveErr) done(nodeSaveErr);

						// Update Node name
						node.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Node
						agent.put('/nodes/' + nodeSaveRes.body._id)
							.send(node)
							.expect(200)
							.end(function(nodeUpdateErr, nodeUpdateRes) {
								// Handle Node update error
								if (nodeUpdateErr) done(nodeUpdateErr);

								// Set assertions
								(nodeUpdateRes.body._id).should.equal(nodeSaveRes.body._id);
								(nodeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Nodes if not signed in', function(done) {
		// Create new Node model instance
		var nodeObj = new Node(node);

		// Save the Node
		nodeObj.save(function() {
			// Request Nodes
			request(app).get('/nodes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Node if not signed in', function(done) {
		// Create new Node model instance
		var nodeObj = new Node(node);

		// Save the Node
		nodeObj.save(function() {
			request(app).get('/nodes/' + nodeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', node.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Node instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Node
				agent.post('/nodes')
					.send(node)
					.expect(200)
					.end(function(nodeSaveErr, nodeSaveRes) {
						// Handle Node save error
						if (nodeSaveErr) done(nodeSaveErr);

						// Delete existing Node
						agent.delete('/nodes/' + nodeSaveRes.body._id)
							.send(node)
							.expect(200)
							.end(function(nodeDeleteErr, nodeDeleteRes) {
								// Handle Node error error
								if (nodeDeleteErr) done(nodeDeleteErr);

								// Set assertions
								(nodeDeleteRes.body._id).should.equal(nodeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Node instance if not signed in', function(done) {
		// Set Node user 
		node.user = user;

		// Create new Node model instance
		var nodeObj = new Node(node);

		// Save the Node
		nodeObj.save(function() {
			// Try deleting Node
			request(app).delete('/nodes/' + nodeObj._id)
			.expect(401)
			.end(function(nodeDeleteErr, nodeDeleteRes) {
				// Set message assertion
				(nodeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Node error error
				done(nodeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		_Node.remove().exec();
		done();
	});
});