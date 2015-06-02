'use strict';

(function() {
	// Buses Controller Spec
	describe('Buses Controller Tests', function() {
		// Initialize global variables
		var BusesController,
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

			// Initialize the Buses controller.
			BusesController = $controller('BusesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Bus object fetched from XHR', inject(function(Buses) {
			// Create sample Bus using the Buses service
			var sampleBus = new Buses({
				name: 'New Bus'
			});

			// Create a sample Buses array that includes the new Bus
			var sampleBuses = [sampleBus];

			// Set GET response
			$httpBackend.expectGET('buses').respond(sampleBuses);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.buses).toEqualData(sampleBuses);
		}));

		it('$scope.findOne() should create an array with one Bus object fetched from XHR using a busId URL parameter', inject(function(Buses) {
			// Define a sample Bus object
			var sampleBus = new Buses({
				name: 'New Bus'
			});

			// Set the URL parameter
			$stateParams.busId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/buses\/([0-9a-fA-F]{24})$/).respond(sampleBus);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bus).toEqualData(sampleBus);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Buses) {
			// Create a sample Bus object
			var sampleBusPostData = new Buses({
				name: 'New Bus'
			});

			// Create a sample Bus response
			var sampleBusResponse = new Buses({
				_id: '525cf20451979dea2c000001',
				name: 'New Bus'
			});

			// Fixture mock form input values
			scope.name = 'New Bus';

			// Set POST response
			$httpBackend.expectPOST('buses', sampleBusPostData).respond(sampleBusResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Bus was created
			expect($location.path()).toBe('/buses/' + sampleBusResponse._id);
		}));

		it('$scope.update() should update a valid Bus', inject(function(Buses) {
			// Define a sample Bus put data
			var sampleBusPutData = new Buses({
				_id: '525cf20451979dea2c000001',
				name: 'New Bus'
			});

			// Mock Bus in scope
			scope.bus = sampleBusPutData;

			// Set PUT response
			$httpBackend.expectPUT(/buses\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/buses/' + sampleBusPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid busId and remove the Bus from the scope', inject(function(Buses) {
			// Create new Bus object
			var sampleBus = new Buses({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Buses array and include the Bus
			scope.buses = [sampleBus];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/buses\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBus);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.buses.length).toBe(0);
		}));
	});
}());