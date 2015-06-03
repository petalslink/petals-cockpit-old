'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Service = mongoose.model('Service'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, service;

/**
 * Service routes tests
 */
describe('Service CRUD tests', function() {
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

		// Save a user to the test db and create new Service
		user.save(function() {
			service = {
				name: 'Service Name'
			};

			done();
		});
	});

	it('should be able to save Service instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Service
				agent.post('/services')
					.send(service)
					.expect(200)
					.end(function(serviceSaveErr, serviceSaveRes) {
						// Handle Service save error
						if (serviceSaveErr) done(serviceSaveErr);

						// Get a list of Services
						agent.get('/services')
							.end(function(servicesGetErr, servicesGetRes) {
								// Handle Service save error
								if (servicesGetErr) done(servicesGetErr);

								// Get Services list
								var services = servicesGetRes.body;

								// Set assertions
								(services[0].user._id).should.equal(userId);
								(services[0].name).should.match('Service Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Service instance if not logged in', function(done) {
		agent.post('/services')
			.send(service)
			.expect(401)
			.end(function(serviceSaveErr, serviceSaveRes) {
				// Call the assertion callback
				done(serviceSaveErr);
			});
	});

	it('should not be able to save Service instance if no name is provided', function(done) {
		// Invalidate name field
		service.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Service
				agent.post('/services')
					.send(service)
					.expect(400)
					.end(function(serviceSaveErr, serviceSaveRes) {
						// Set message assertion
						(serviceSaveRes.body.message).should.match('Please fill Service name');
						
						// Handle Service save error
						done(serviceSaveErr);
					});
			});
	});

	it('should be able to update Service instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Service
				agent.post('/services')
					.send(service)
					.expect(200)
					.end(function(serviceSaveErr, serviceSaveRes) {
						// Handle Service save error
						if (serviceSaveErr) done(serviceSaveErr);

						// Update Service name
						service.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Service
						agent.put('/services/' + serviceSaveRes.body._id)
							.send(service)
							.expect(200)
							.end(function(serviceUpdateErr, serviceUpdateRes) {
								// Handle Service update error
								if (serviceUpdateErr) done(serviceUpdateErr);

								// Set assertions
								(serviceUpdateRes.body._id).should.equal(serviceSaveRes.body._id);
								(serviceUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Services if not signed in', function(done) {
		// Create new Service model instance
		var serviceObj = new Service(service);

		// Save the Service
		serviceObj.save(function() {
			// Request Services
			request(app).get('/services')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Service if not signed in', function(done) {
		// Create new Service model instance
		var serviceObj = new Service(service);

		// Save the Service
		serviceObj.save(function() {
			request(app).get('/services/' + serviceObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', service.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Service instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Service
				agent.post('/services')
					.send(service)
					.expect(200)
					.end(function(serviceSaveErr, serviceSaveRes) {
						// Handle Service save error
						if (serviceSaveErr) done(serviceSaveErr);

						// Delete existing Service
						agent.delete('/services/' + serviceSaveRes.body._id)
							.send(service)
							.expect(200)
							.end(function(serviceDeleteErr, serviceDeleteRes) {
								// Handle Service error error
								if (serviceDeleteErr) done(serviceDeleteErr);

								// Set assertions
								(serviceDeleteRes.body._id).should.equal(serviceSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Service instance if not signed in', function(done) {
		// Set Service user 
		service.user = user;

		// Create new Service model instance
		var serviceObj = new Service(service);

		// Save the Service
		serviceObj.save(function() {
			// Try deleting Service
			request(app).delete('/services/' + serviceObj._id)
			.expect(401)
			.end(function(serviceDeleteErr, serviceDeleteRes) {
				// Set message assertion
				(serviceDeleteRes.body.message).should.match('User is not logged in');

				// Handle Service error error
				done(serviceDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Service.remove().exec();
		done();
	});
});