'use strict';

// Services controller
angular.module('services').controller('ServicesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Services',
	function($scope, $stateParams, $location, Authentication, Services) {
		$scope.authentication = Authentication;

		// Create new Service
		$scope.create = function() {
			// Create new Service object
			var service = new Services ({
				name: this.name
			});

			// Redirect after save
			service.$save(function(response) {
				$location.path('services/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Service
		$scope.remove = function(service) {
			if ( service ) { 
				service.$remove();

				for (var i in $scope.services) {
					if ($scope.services [i] === service) {
						$scope.services.splice(i, 1);
					}
				}
			} else {
				$scope.service.$remove(function() {
					$location.path('services');
				});
			}
		};

		// Update existing Service
		$scope.update = function() {
			var service = $scope.service;

			service.$update(function() {
				$location.path('services/' + service._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Services
		$scope.find = function() {
			$scope.services = Services.query();
		};

		// Find existing Service
		$scope.findOne = function() {
			$scope.service = Services.get({ 
				serviceId: $stateParams.serviceId
			});
		};
	}
]);