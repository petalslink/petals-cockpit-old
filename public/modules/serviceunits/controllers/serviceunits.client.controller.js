'use strict';

// Serviceunits controller
angular.module('serviceunits').controller('ServiceunitsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Serviceunits',
	function($scope, $stateParams, $location, Authentication, Serviceunits) {
		$scope.authentication = Authentication;

		// Create new Serviceunit
		$scope.create = function() {
			// Create new Serviceunit object
			var serviceunit = new Serviceunits ({
				name: this.name
			});

			// Redirect after save
			serviceunit.$save(function(response) {
				$location.path('serviceunits/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Serviceunit
		$scope.remove = function(serviceunit) {
			if ( serviceunit ) { 
				serviceunit.$remove();

				for (var i in $scope.serviceunits) {
					if ($scope.serviceunits [i] === serviceunit) {
						$scope.serviceunits.splice(i, 1);
					}
				}
			} else {
				$scope.serviceunit.$remove(function() {
					$location.path('serviceunits');
				});
			}
		};

		// Update existing Serviceunit
		$scope.update = function() {
			var serviceunit = $scope.serviceunit;

			serviceunit.$update(function() {
				$location.path('serviceunits/' + serviceunit._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Serviceunits
		$scope.find = function() {
			$scope.serviceunits = Serviceunits.query();
		};

		// Find existing Serviceunit
		$scope.findOne = function() {
			$scope.serviceunit = Serviceunits.get({ 
				serviceunitId: $stateParams.serviceunitId
			});
		};
	}
]);