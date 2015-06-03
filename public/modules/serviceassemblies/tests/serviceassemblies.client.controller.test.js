'use strict';

(function() {
	// Serviceassemblies Controller Spec
	describe('Serviceassemblies Controller Tests', function() {
		// Initialize global variables
		var ServiceassembliesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Serviceassemblies controller.
			ServiceassembliesController = $controller('ServiceassembliesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Serviceassembly object fetched from XHR', inject(function(Serviceassemblies) {
			// Create sample Serviceassembly using the Serviceassemblies service
			var sampleServiceassembly = new Serviceassemblies({
				name: 'New Serviceassembly'
			});

			// Create a sample Serviceassemblies array that includes the new Serviceassembly
			var sampleServiceassemblies = [sampleServiceassembly];

			// Set GET response
			$httpBackend.expectGET('serviceassemblies').respond(sampleServiceassemblies);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.serviceassemblies).toEqualData(sampleServiceassemblies);
		}));

		it('$scope.findOne() should create an array with one Serviceassembly object fetched from XHR using a serviceassemblyId URL parameter', inject(function(Serviceassemblies) {
			// Define a sample Serviceassembly object
			var sampleServiceassembly = new Serviceassemblies({
				name: 'New Serviceassembly'
			});

			// Set the URL parameter
			$stateParams.serviceassemblyId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/serviceassemblies\/([0-9a-fA-F]{24})$/).respond(sampleServiceassembly);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.serviceassembly).toEqualData(sampleServiceassembly);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Serviceassemblies) {
			// Create a sample Serviceassembly object
			var sampleServiceassemblyPostData = new Serviceassemblies({
				name: 'New Serviceassembly'
			});

			// Create a sample Serviceassembly response
			var sampleServiceassemblyResponse = new Serviceassemblies({
				_id: '525cf20451979dea2c000001',
				name: 'New Serviceassembly'
			});

			// Fixture mock form input values
			scope.name = 'New Serviceassembly';

			// Set POST response
			$httpBackend.expectPOST('serviceassemblies', sampleServiceassemblyPostData).respond(sampleServiceassemblyResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Serviceassembly was created
			expect($location.path()).toBe('/serviceassemblies/' + sampleServiceassemblyResponse._id);
		}));

		it('$scope.update() should update a valid Serviceassembly', inject(function(Serviceassemblies) {
			// Define a sample Serviceassembly put data
			var sampleServiceassemblyPutData = new Serviceassemblies({
				_id: '525cf20451979dea2c000001',
				name: 'New Serviceassembly'
			});

			// Mock Serviceassembly in scope
			scope.serviceassembly = sampleServiceassemblyPutData;

			// Set PUT response
			$httpBackend.expectPUT(/serviceassemblies\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/serviceassemblies/' + sampleServiceassemblyPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid serviceassemblyId and remove the Serviceassembly from the scope', inject(function(Serviceassemblies) {
			// Create new Serviceassembly object
			var sampleServiceassembly = new Serviceassemblies({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Serviceassemblies array and include the Serviceassembly
			scope.serviceassemblies = [sampleServiceassembly];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/serviceassemblies\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleServiceassembly);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.serviceassemblies.length).toBe(0);
		}));
	});
}());