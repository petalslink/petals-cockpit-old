'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Component = mongoose.model('Component'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, component;

/**
 * Component routes tests
 */
describe('Component CRUD tests', function() {
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

		// Save a user to the test db and create new Component
		user.save(function() {
			component = {
				name: 'Component Name'
			};

			done();
		});
	});

	it('should be able to save Component instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Component
				agent.post('/components')
					.send(component)
					.expect(200)
					.end(function(componentSaveErr, componentSaveRes) {
						// Handle Component save error
						if (componentSaveErr) done(componentSaveErr);

						// Get a list of Components
						agent.get('/components')
							.end(function(componentsGetErr, componentsGetRes) {
								// Handle Component save error
								if (componentsGetErr) done(componentsGetErr);

								// Get Components list
								var components = componentsGetRes.body;

								// Set assertions
								(components[0].user._id).should.equal(userId);
								(components[0].name).should.match('Component Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Component instance if not logged in', function(done) {
		agent.post('/components')
			.send(component)
			.expect(401)
			.end(function(componentSaveErr, componentSaveRes) {
				// Call the assertion callback
				done(componentSaveErr);
			});
	});

	it('should not be able to save Component instance if no name is provided', function(done) {
		// Invalidate name field
		component.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Component
				agent.post('/components')
					.send(component)
					.expect(400)
					.end(function(componentSaveErr, componentSaveRes) {
						// Set message assertion
						(componentSaveRes.body.message).should.match('Please fill Component name');
						
						// Handle Component save error
						done(componentSaveErr);
					});
			});
	});

	it('should be able to update Component instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Component
				agent.post('/components')
					.send(component)
					.expect(200)
					.end(function(componentSaveErr, componentSaveRes) {
						// Handle Component save error
						if (componentSaveErr) done(componentSaveErr);

						// Update Component name
						component.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Component
						agent.put('/components/' + componentSaveRes.body._id)
							.send(component)
							.expect(200)
							.end(function(componentUpdateErr, componentUpdateRes) {
								// Handle Component update error
								if (componentUpdateErr) done(componentUpdateErr);

								// Set assertions
								(componentUpdateRes.body._id).should.equal(componentSaveRes.body._id);
								(componentUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Components if not signed in', function(done) {
		// Create new Component model instance
		var componentObj = new Component(component);

		// Save the Component
		componentObj.save(function() {
			// Request Components
			request(app).get('/components')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Component if not signed in', function(done) {
		// Create new Component model instance
		var componentObj = new Component(component);

		// Save the Component
		componentObj.save(function() {
			request(app).get('/components/' + componentObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', component.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Component instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Component
				agent.post('/components')
					.send(component)
					.expect(200)
					.end(function(componentSaveErr, componentSaveRes) {
						// Handle Component save error
						if (componentSaveErr) done(componentSaveErr);

						// Delete existing Component
						agent.delete('/components/' + componentSaveRes.body._id)
							.send(component)
							.expect(200)
							.end(function(componentDeleteErr, componentDeleteRes) {
								// Handle Component error error
								if (componentDeleteErr) done(componentDeleteErr);

								// Set assertions
								(componentDeleteRes.body._id).should.equal(componentSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Component instance if not signed in', function(done) {
		// Set Component user 
		component.user = user;

		// Create new Component model instance
		var componentObj = new Component(component);

		// Save the Component
		componentObj.save(function() {
			// Try deleting Component
			request(app).delete('/components/' + componentObj._id)
			.expect(401)
			.end(function(componentDeleteErr, componentDeleteRes) {
				// Set message assertion
				(componentDeleteRes.body.message).should.match('User is not logged in');

				// Handle Component error error
				done(componentDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Component.remove().exec();
		done();
	});
});