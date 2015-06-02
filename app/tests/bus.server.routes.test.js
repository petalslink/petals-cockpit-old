'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Bus = mongoose.model('Bus'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, bus;

/**
 * Bus routes tests
 */
describe('Bus CRUD tests', function() {
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

		// Save a user to the test db and create new Bus
		user.save(function() {
			bus = {
				name: 'Bus Name'
			};

			done();
		});
	});

	it('should be able to save Bus instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bus
				agent.post('/buses')
					.send(bus)
					.expect(200)
					.end(function(busSaveErr, busSaveRes) {
						// Handle Bus save error
						if (busSaveErr) done(busSaveErr);

						// Get a list of Buses
						agent.get('/buses')
							.end(function(busesGetErr, busesGetRes) {
								// Handle Bus save error
								if (busesGetErr) done(busesGetErr);

								// Get Buses list
								var buses = busesGetRes.body;

								// Set assertions
								(buses[0].user._id).should.equal(userId);
								(buses[0].name).should.match('Bus Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Bus instance if not logged in', function(done) {
		agent.post('/buses')
			.send(bus)
			.expect(401)
			.end(function(busSaveErr, busSaveRes) {
				// Call the assertion callback
				done(busSaveErr);
			});
	});

	it('should not be able to save Bus instance if no name is provided', function(done) {
		// Invalidate name field
		bus.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bus
				agent.post('/buses')
					.send(bus)
					.expect(400)
					.end(function(busSaveErr, busSaveRes) {
						// Set message assertion
						(busSaveRes.body.message).should.match('Please fill Bus name');
						
						// Handle Bus save error
						done(busSaveErr);
					});
			});
	});

	it('should be able to update Bus instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bus
				agent.post('/buses')
					.send(bus)
					.expect(200)
					.end(function(busSaveErr, busSaveRes) {
						// Handle Bus save error
						if (busSaveErr) done(busSaveErr);

						// Update Bus name
						bus.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Bus
						agent.put('/buses/' + busSaveRes.body._id)
							.send(bus)
							.expect(200)
							.end(function(busUpdateErr, busUpdateRes) {
								// Handle Bus update error
								if (busUpdateErr) done(busUpdateErr);

								// Set assertions
								(busUpdateRes.body._id).should.equal(busSaveRes.body._id);
								(busUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Buses if not signed in', function(done) {
		// Create new Bus model instance
		var busObj = new Bus(bus);

		// Save the Bus
		busObj.save(function() {
			// Request Buses
			request(app).get('/buses')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Bus if not signed in', function(done) {
		// Create new Bus model instance
		var busObj = new Bus(bus);

		// Save the Bus
		busObj.save(function() {
			request(app).get('/buses/' + busObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', bus.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Bus instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bus
				agent.post('/buses')
					.send(bus)
					.expect(200)
					.end(function(busSaveErr, busSaveRes) {
						// Handle Bus save error
						if (busSaveErr) done(busSaveErr);

						// Delete existing Bus
						agent.delete('/buses/' + busSaveRes.body._id)
							.send(bus)
							.expect(200)
							.end(function(busDeleteErr, busDeleteRes) {
								// Handle Bus error error
								if (busDeleteErr) done(busDeleteErr);

								// Set assertions
								(busDeleteRes.body._id).should.equal(busSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Bus instance if not signed in', function(done) {
		// Set Bus user 
		bus.user = user;

		// Create new Bus model instance
		var busObj = new Bus(bus);

		// Save the Bus
		busObj.save(function() {
			// Try deleting Bus
			request(app).delete('/buses/' + busObj._id)
			.expect(401)
			.end(function(busDeleteErr, busDeleteRes) {
				// Set message assertion
				(busDeleteRes.body.message).should.match('User is not logged in');

				// Handle Bus error error
				done(busDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Bus.remove().exec();
		done();
	});
});