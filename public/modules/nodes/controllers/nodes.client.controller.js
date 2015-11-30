'use strict';

// Nodes controller

var nodesApp = angular.module('nodes');

nodesApp.controller('NodesController', ['$scope', '$stateParams', 'Authentication', 'Nodes', '$modal', '$log', '$rootScope',
	function ($scope, $stateParams, Authentication, Nodes, $modal, $log, $rootScope) {

		this.authentication = Authentication;

		// Find a list of Node
		this.nodes = Nodes.getNodes();

		// Recieve Event
		var self = this;
		$rootScope.$on('NodeCreate', function(eventName, node) {
			self.nodes.push(node);
		});

		/********************************************************* OK *********************************************************/
			// Open a modal window to Create a single node record
		this.modalCreate = function (size, createNodeForm) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/nodes/views/create-node.client.view.html',
				controller: function ($scope, $modalInstance) {

					$scope.ok = function () {
						if (createNodeForm.$valid) {
							$log.info('Form is valid');
							$modalInstance.close();

						} else {
							$log.error('Form is not valid');
						}
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				},
				size: size
			});

			modalInstance.result.then(function (selectedItem) {
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

		/********************************************************* OK *********************************************************/
			// Open a modal window to Update a single node record
		this.modalUpdate = function (size, selectedNode, updateNodeForm) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/nodes/views/edit-node.client.view.html',
				controller: function ($scope, $modalInstance, node) {
					$scope.node = node;

					$scope.ok = function () {
						if (updateNodeForm.$valid) {
							$log.info('Form is valid');
							$modalInstance.close($scope.node);

						} else {
							$log.error('Form is not valid');
						}
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				},
				size: size,
				resolve: {
					node: function () {
						return selectedNode;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
	}
]);


nodesApp.config(['$mdThemingProvider', function ($mdThemingProvider) {
	$mdThemingProvider.theme('node-theme', 'default')
			.primaryPalette('orange', {
				'default': '700',
				'hue-1': '500',
				'hue-2': '300',
				'hue-3': '100'
			})
			.accentPalette('deep-purple', {
				'default': '800',
				'hue-1': '800',
				'hue-2': '300',
				'hue-3': '200'
			});
}]);



/********************************************************* OK *********************************************************/
// CREATE CONTROLLER
nodesApp.controller('NodesCreateController', ['$scope', 'Nodes', 'Notify', 'Buses', '$rootScope',
	function ($scope, Nodes, Notify, Buses, $rootScope) {

		// Find a list of Bus
		$scope.buses = Buses.getBuses();

		$scope.node = {};

		// Create new Node
		$scope.create = function () {

			console.log('CHECK CREATE', $scope.node);
			// Redirect after save
			Nodes.postNode($scope.node, function (node) {

				Notify.sendMsg('NewNode', {'id': node._id});
				$rootScope.$broadcast('NodeCreate', node);


			}, function (errorResponse) {
				$scope.error = 'Could not Create Node !';
			});

		};
	}
]);
/********************************************************* OK *********************************************************/
// UPDATE CONTROLLER
nodesApp.controller('NodesUpdateController', ['$scope', 'Nodes', 'Notify', 'Buses', '$rootScope',
	function ($scope, Nodes, Notify, Buses, $rootScope) {

		// Find a list of Bus
		$scope.buses = Buses.getBuses();

		// Update existing Node
		this.update = function(updatedNode) {
			var node = updatedNode;
			console.log('CHECK UPDATE', $scope.node, $scope.sItem);

			Nodes.updateNode($scope.node, $scope.sItem, function(response) {

				Notify.sendMsg('UpdateNode', {'id': response._id});

			}, function(errorResponse) {
				$scope.error = 'Could not Update Node !';
			});
		};
	}
]);