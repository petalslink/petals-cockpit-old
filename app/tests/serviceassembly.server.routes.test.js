'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Serviceassembly = mongoose.model('Serviceassembly'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, serviceassembly;

/**
 * Serviceassembly routes tests
 */
describe('Serviceassembly CRUD tests', function() {
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

		// Save a user to the test db and create new Serviceassembly
		user.save(function() {
			serviceassembly = {
				name: 'Serviceassembly Name'
			};

			done();
		});
	});

	it('should be able to save Serviceassembly instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Serviceassembly
				agent.post('/serviceassemblies')
					.send(serviceassembly)
					.expect(200)
					.end(function(serviceassemblySaveErr, serviceassemblySaveRes) {
						// Handle Serviceassembly save error
						if (serviceassemblySaveErr) done(serviceassemblySaveErr);

						// Get a list of Serviceassemblies
						agent.get('/serviceassemblies')
							.end(function(serviceassembliesGetErr, serviceassembliesGetRes) {
								// Handle Serviceassembly save error
								if (serviceassembliesGetErr) done(serviceassembliesGetErr);

								// Get Serviceassemblies list
								var serviceassemblies = serviceassembliesGetRes.body;

								// Set assertions
								(serviceassemblies[0].user._id).should.equal(userId);
								(serviceassemblies[0].name).should.match('Serviceassembly Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Serviceassembly instance if not logged in', function(done) {
		agent.post('/serviceassemblies')
			.send(serviceassembly)
			.expect(401)
			.end(function(serviceassemblySaveErr, serviceassemblySaveRes) {
				// Call the assertion callback
				done(serviceassemblySaveErr);
			});
	});

	it('should not be able to save Serviceassembly instance if no name is provided', function(done) {
		// Invalidate name field
		serviceassembly.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Serviceassembly
				agent.post('/serviceassemblies')
					.send(serviceassembly)
					.expect(400)
					.end(function(serviceassemblySaveErr, serviceassemblySaveRes) {
						// Set message assertion
						(serviceassemblySaveRes.body.message).should.match('Please fill Serviceassembly name');
						
						// Handle Serviceassembly save error
						done(serviceassemblySaveErr);
					});
			});
	});

	it('should be able to update Serviceassembly instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Serviceassembly
				agent.post('/serviceassemblies')
					.send(serviceassembly)
					.expect(200)
					.end(function(serviceassemblySaveErr, serviceassemblySaveRes) {
						// Handle Serviceassembly save error
						if (serviceassemblySaveErr) done(serviceassemblySaveErr);

						// Update Serviceassembly name
						serviceassembly.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Serviceassembly
						agent.put('/serviceassemblies/' + serviceassemblySaveRes.body._id)
							.send(serviceassembly)
							.expect(200)
							.end(function(serviceassemblyUpdateErr, serviceassemblyUpdateRes) {
								// Handle Serviceassembly update error
								if (serviceassemblyUpdateErr) done(serviceassemblyUpdateErr);

								// Set assertions
								(serviceassemblyUpdateRes.body._id).should.equal(serviceassemblySaveRes.body._id);
								(serviceassemblyUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Serviceassemblies if not signed in', function(done) {
		// Create new Serviceassembly model instance
		var serviceassemblyObj = new Serviceassembly(serviceassembly);

		// Save the Serviceassembly
		serviceassemblyObj.save(function() {
			// Request Serviceassemblies
			request(app).get('/serviceassemblies')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Serviceassembly if not signed in', function(done) {
		// Create new Serviceassembly model instance
		var serviceassemblyObj = new Serviceassembly(serviceassembly);

		// Save the Serviceassembly
		serviceassemblyObj.save(function() {
			request(app).get('/serviceassemblies/' + serviceassemblyObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', serviceassembly.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Serviceassembly instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Serviceassembly
				agent.post('/serviceassemblies')
					.send(serviceassembly)
					.expect(200)
					.end(function(serviceassemblySaveErr, serviceassemblySaveRes) {
						// Handle Serviceassembly save error
						if (serviceassemblySaveErr) done(serviceassemblySaveErr);

						// Delete existing Serviceassembly
						agent.delete('/serviceassemblies/' + serviceassemblySaveRes.body._id)
							.send(serviceassembly)
							.expect(200)
							.end(function(serviceassemblyDeleteErr, serviceassemblyDeleteRes) {
								// Handle Serviceassembly error error
								if (serviceassemblyDeleteErr) done(serviceassemblyDeleteErr);

								// Set assertions
								(serviceassemblyDeleteRes.body._id).should.equal(serviceassemblySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Serviceassembly instance if not signed in', function(done) {
		// Set Serviceassembly user 
		serviceassembly.user = user;

		// Create new Serviceassembly model instance
		var serviceassemblyObj = new Serviceassembly(serviceassembly);

		// Save the Serviceassembly
		serviceassemblyObj.save(function() {
			// Try deleting Serviceassembly
			request(app).delete('/serviceassemblies/' + serviceassemblyObj._id)
			.expect(401)
			.end(function(serviceassemblyDeleteErr, serviceassemblyDeleteRes) {
				// Set message assertion
				(serviceassemblyDeleteRes.body.message).should.match('User is not logged in');

				// Handle Serviceassembly error error
				done(serviceassemblyDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Serviceassembly.remove().exec();
		done();
	});
});