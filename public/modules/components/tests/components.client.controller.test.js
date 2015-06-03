'use strict';

(function() {
	// Components Controller Spec
	describe('Components Controller Tests', function() {
		// Initialize global variables
		var ComponentsController,
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

			// Initialize the Components controller.
			ComponentsController = $controller('ComponentsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Component object fetched from XHR', inject(function(Components) {
			// Create sample Component using the Components service
			var sampleComponent = new Components({
				name: 'New Component'
			});

			// Create a sample Components array that includes the new Component
			var sampleComponents = [sampleComponent];

			// Set GET response
			$httpBackend.expectGET('components').respond(sampleComponents);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.components).toEqualData(sampleComponents);
		}));

		it('$scope.findOne() should create an array with one Component object fetched from XHR using a componentId URL parameter', inject(function(Components) {
			// Define a sample Component object
			var sampleComponent = new Components({
				name: 'New Component'
			});

			// Set the URL parameter
			$stateParams.componentId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/components\/([0-9a-fA-F]{24})$/).respond(sampleComponent);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.component).toEqualData(sampleComponent);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Components) {
			// Create a sample Component object
			var sampleComponentPostData = new Components({
				name: 'New Component'
			});

			// Create a sample Component response
			var sampleComponentResponse = new Components({
				_id: '525cf20451979dea2c000001',
				name: 'New Component'
			});

			// Fixture mock form input values
			scope.name = 'New Component';

			// Set POST response
			$httpBackend.expectPOST('components', sampleComponentPostData).respond(sampleComponentResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Component was created
			expect($location.path()).toBe('/components/' + sampleComponentResponse._id);
		}));

		it('$scope.update() should update a valid Component', inject(function(Components) {
			// Define a sample Component put data
			var sampleComponentPutData = new Components({
				_id: '525cf20451979dea2c000001',
				name: 'New Component'
			});

			// Mock Component in scope
			scope.component = sampleComponentPutData;

			// Set PUT response
			$httpBackend.expectPUT(/components\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/components/' + sampleComponentPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid componentId and remove the Component from the scope', inject(function(Components) {
			// Create new Component object
			var sampleComponent = new Components({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Components array and include the Component
			scope.components = [sampleComponent];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/components\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleComponent);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.components.length).toBe(0);
		}));
	});
}());