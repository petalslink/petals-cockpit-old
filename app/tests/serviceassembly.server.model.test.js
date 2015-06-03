'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Serviceassembly = mongoose.model('Serviceassembly');

/**
 * Globals
 */
var user, serviceassembly;

/**
 * Unit tests
 */
describe('Serviceassembly Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			serviceassembly = new Serviceassembly({
				name: 'Serviceassembly Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return serviceassembly.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			serviceassembly.name = '';

			return serviceassembly.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Serviceassembly.remove().exec();
		User.remove().exec();

		done();
	});
});