'use strict';

// Serviceassemblies controller
angular.module('serviceassemblies').controller('ServiceassembliesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Serviceassemblies',
	function($scope, $stateParams, $location, Authentication, Serviceassemblies) {
		$scope.authentication = Authentication;

		// Create new Serviceassembly
		$scope.create = function() {
			// Create new Serviceassembly object
			var serviceassembly = new Serviceassemblies ({
				name: this.name
			});

			// Redirect after save
			serviceassembly.$save(function(response) {
				$location.path('serviceassemblies/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Serviceassembly
		$scope.remove = function(serviceassembly) {
			if ( serviceassembly ) { 
				serviceassembly.$remove();

				for (var i in $scope.serviceassemblies) {
					if ($scope.serviceassemblies [i] === serviceassembly) {
						$scope.serviceassemblies.splice(i, 1);
					}
				}
			} else {
				$scope.serviceassembly.$remove(function() {
					$location.path('serviceassemblies');
				});
			}
		};

		// Update existing Serviceassembly
		$scope.update = function() {
			var serviceassembly = $scope.serviceassembly;

			serviceassembly.$update(function() {
				$location.path('serviceassemblies/' + serviceassembly._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Serviceassemblies
		$scope.find = function() {
			$scope.serviceassemblies = Serviceassemblies.query();
		};

		// Find existing Serviceassembly
		$scope.findOne = function() {
			$scope.serviceassembly = Serviceassemblies.get({ 
				serviceassemblyId: $stateParams.serviceassemblyId
			});
		};
	}
]);