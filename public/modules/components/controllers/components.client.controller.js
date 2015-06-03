'use strict';

// Components controller
angular.module('components').controller('ComponentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Components',
	function($scope, $stateParams, $location, Authentication, Components) {
		$scope.authentication = Authentication;

		// Create new Component
		$scope.create = function() {
			// Create new Component object
			var component = new Components ({
				name: this.name
			});

			// Redirect after save
			component.$save(function(response) {
				$location.path('components/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Component
		$scope.remove = function(component) {
			if ( component ) { 
				component.$remove();

				for (var i in $scope.components) {
					if ($scope.components [i] === component) {
						$scope.components.splice(i, 1);
					}
				}
			} else {
				$scope.component.$remove(function() {
					$location.path('components');
				});
			}
		};

		// Update existing Component
		$scope.update = function() {
			var component = $scope.component;

			component.$update(function() {
				$location.path('components/' + component._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Components
		$scope.find = function() {
			$scope.components = Components.query();
		};

		// Find existing Component
		$scope.findOne = function() {
			$scope.component = Components.get({ 
				componentId: $stateParams.componentId
			});
		};
	}
]);