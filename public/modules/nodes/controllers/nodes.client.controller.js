'use strict';

// Nodes controller
angular.module('nodes').controller('NodesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Nodes',
	function($scope, $stateParams, $location, Authentication, Nodes) {
		$scope.authentication = Authentication;

		// Create new Node
		$scope.create = function() {
			// Create new Node object
			var node = new Nodes ({
				name: this.name
			});

			// Redirect after save
			node.$save(function(response) {
				$location.path('nodes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Node
		$scope.remove = function(node) {
			if ( node ) { 
				node.$remove();

				for (var i in $scope.nodes) {
					if ($scope.nodes [i] === node) {
						$scope.nodes.splice(i, 1);
					}
				}
			} else {
				$scope.node.$remove(function() {
					$location.path('nodes');
				});
			}
		};

		// Update existing Node
		$scope.update = function() {
			var node = $scope.node;

			node.$update(function() {
				$location.path('nodes/' + node._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Nodes
		$scope.find = function() {
			$scope.nodes = Nodes.query();
		};

		// Find existing Node
		$scope.findOne = function() {
			$scope.node = Nodes.get({ 
				nodeId: $stateParams.nodeId
			});
		};
	}
]);