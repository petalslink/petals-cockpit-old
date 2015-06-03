'use strict';

(function() {
	// Serviceunits Controller Spec
	describe('Serviceunits Controller Tests', function() {
		// Initialize global variables
		var ServiceunitsController,
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

			// Initialize the Serviceunits controller.
			ServiceunitsController = $controller('ServiceunitsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Serviceunit object fetched from XHR', inject(function(Serviceunits) {
			// Create sample Serviceunit using the Serviceunits service
			var sampleServiceunit = new Serviceunits({
				name: 'New Serviceunit'
			});

			// Create a sample Serviceunits array that includes the new Serviceunit
			var sampleServiceunits = [sampleServiceunit];

			// Set GET response
			$httpBackend.expectGET('serviceunits').respond(sampleServiceunits);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.serviceunits).toEqualData(sampleServiceunits);
		}));

		it('$scope.findOne() should create an array with one Serviceunit object fetched from XHR using a serviceunitId URL parameter', inject(function(Serviceunits) {
			// Define a sample Serviceunit object
			var sampleServiceunit = new Serviceunits({
				name: 'New Serviceunit'
			});

			// Set the URL parameter
			$stateParams.serviceunitId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/serviceunits\/([0-9a-fA-F]{24})$/).respond(sampleServiceunit);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.serviceunit).toEqualData(sampleServiceunit);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Serviceunits) {
			// Create a sample Serviceunit object
			var sampleServiceunitPostData = new Serviceunits({
				name: 'New Serviceunit'
			});

			// Create a sample Serviceunit response
			var sampleServiceunitResponse = new Serviceunits({
				_id: '525cf20451979dea2c000001',
				name: 'New Serviceunit'
			});

			// Fixture mock form input values
			scope.name = 'New Serviceunit';

			// Set POST response
			$httpBackend.expectPOST('serviceunits', sampleServiceunitPostData).respond(sampleServiceunitResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Serviceunit was created
			expect($location.path()).toBe('/serviceunits/' + sampleServiceunitResponse._id);
		}));

		it('$scope.update() should update a valid Serviceunit', inject(function(Serviceunits) {
			// Define a sample Serviceunit put data
			var sampleServiceunitPutData = new Serviceunits({
				_id: '525cf20451979dea2c000001',
				name: 'New Serviceunit'
			});

			// Mock Serviceunit in scope
			scope.serviceunit = sampleServiceunitPutData;

			// Set PUT response
			$httpBackend.expectPUT(/serviceunits\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/serviceunits/' + sampleServiceunitPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid serviceunitId and remove the Serviceunit from the scope', inject(function(Serviceunits) {
			// Create new Serviceunit object
			var sampleServiceunit = new Serviceunits({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Serviceunits array and include the Serviceunit
			scope.serviceunits = [sampleServiceunit];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/serviceunits\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleServiceunit);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.serviceunits.length).toBe(0);
		}));
	});
}());