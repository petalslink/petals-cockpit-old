'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Serviceunit = mongoose.model('Serviceunit'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, serviceunit;

/**
 * Serviceunit routes tests
 */
describe('Serviceunit CRUD tests', function() {
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

		// Save a user to the test db and create new Serviceunit
		user.save(function() {
			serviceunit = {
				name: 'Serviceunit Name'
			};

			done();
		});
	});

	it('should be able to save Serviceunit instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Serviceunit
				agent.post('/serviceunits')
					.send(serviceunit)
					.expect(200)
					.end(function(serviceunitSaveErr, serviceunitSaveRes) {
						// Handle Serviceunit save error
						if (serviceunitSaveErr) done(serviceunitSaveErr);

						// Get a list of Serviceunits
						agent.get('/serviceunits')
							.end(function(serviceunitsGetErr, serviceunitsGetRes) {
								// Handle Serviceunit save error
								if (serviceunitsGetErr) done(serviceunitsGetErr);

								// Get Serviceunits list
								var serviceunits = serviceunitsGetRes.body;

								// Set assertions
								(serviceunits[0].user._id).should.equal(userId);
								(serviceunits[0].name).should.match('Serviceunit Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Serviceunit instance if not logged in', function(done) {
		agent.post('/serviceunits')
			.send(serviceunit)
			.expect(401)
			.end(function(serviceunitSaveErr, serviceunitSaveRes) {
				// Call the assertion callback
				done(serviceunitSaveErr);
			});
	});

	it('should not be able to save Serviceunit instance if no name is provided', function(done) {
		// Invalidate name field
		serviceunit.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Serviceunit
				agent.post('/serviceunits')
					.send(serviceunit)
					.expect(400)
					.end(function(serviceunitSaveErr, serviceunitSaveRes) {
						// Set message assertion
						(serviceunitSaveRes.body.message).should.match('Please fill Serviceunit name');
						
						// Handle Serviceunit save error
						done(serviceunitSaveErr);
					});
			});
	});

	it('should be able to update Serviceunit instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Serviceunit
				agent.post('/serviceunits')
					.send(serviceunit)
					.expect(200)
					.end(function(serviceunitSaveErr, serviceunitSaveRes) {
						// Handle Serviceunit save error
						if (serviceunitSaveErr) done(serviceunitSaveErr);

						// Update Serviceunit name
						serviceunit.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Serviceunit
						agent.put('/serviceunits/' + serviceunitSaveRes.body._id)
							.send(serviceunit)
							.expect(200)
							.end(function(serviceunitUpdateErr, serviceunitUpdateRes) {
								// Handle Serviceunit update error
								if (serviceunitUpdateErr) done(serviceunitUpdateErr);

								// Set assertions
								(serviceunitUpdateRes.body._id).should.equal(serviceunitSaveRes.body._id);
								(serviceunitUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Serviceunits if not signed in', function(done) {
		// Create new Serviceunit model instance
		var serviceunitObj = new Serviceunit(serviceunit);

		// Save the Serviceunit
		serviceunitObj.save(function() {
			// Request Serviceunits
			request(app).get('/serviceunits')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Serviceunit if not signed in', function(done) {
		// Create new Serviceunit model instance
		var serviceunitObj = new Serviceunit(serviceunit);

		// Save the Serviceunit
		serviceunitObj.save(function() {
			request(app).get('/serviceunits/' + serviceunitObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', serviceunit.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Serviceunit instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Serviceunit
				agent.post('/serviceunits')
					.send(serviceunit)
					.expect(200)
					.end(function(serviceunitSaveErr, serviceunitSaveRes) {
						// Handle Serviceunit save error
						if (serviceunitSaveErr) done(serviceunitSaveErr);

						// Delete existing Serviceunit
						agent.delete('/serviceunits/' + serviceunitSaveRes.body._id)
							.send(serviceunit)
							.expect(200)
							.end(function(serviceunitDeleteErr, serviceunitDeleteRes) {
								// Handle Serviceunit error error
								if (serviceunitDeleteErr) done(serviceunitDeleteErr);

								// Set assertions
								(serviceunitDeleteRes.body._id).should.equal(serviceunitSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Serviceunit instance if not signed in', function(done) {
		// Set Serviceunit user 
		serviceunit.user = user;

		// Create new Serviceunit model instance
		var serviceunitObj = new Serviceunit(serviceunit);

		// Save the Serviceunit
		serviceunitObj.save(function() {
			// Try deleting Serviceunit
			request(app).delete('/serviceunits/' + serviceunitObj._id)
			.expect(401)
			.end(function(serviceunitDeleteErr, serviceunitDeleteRes) {
				// Set message assertion
				(serviceunitDeleteRes.body.message).should.match('User is not logged in');

				// Handle Serviceunit error error
				done(serviceunitDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Serviceunit.remove().exec();
		done();
	});
});