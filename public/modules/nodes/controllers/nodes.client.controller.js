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
/********************************************************* OK *********************************************************/
// CREATE CONTROLLER
nodesApp.controller('NodesCreateController', ['$scope', 'Nodes', 'Notify', 'Buses', '$rootScope',
	function ($scope, NodesServiceCreate, Notify, Buses, $rootScope) {

		// Find a list of Bus
		$scope.buses = Buses.getBuses();

		$scope.node = {};

		// Create new Node
		$scope.create = function () {

			console.log('CHECK CREATE', $scope.node);
			// Redirect after save
			NodesServiceCreate.postNode($scope.node, function (node) {

				Notify.sendMsg('NewNode', {'id': node._id});
				$rootScope.$emit('NodeCreate', node);


			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};
	}
]);
/********************************************************* OK *********************************************************/
// UPDATE CONTROLLER
nodesApp.controller('NodesUpdateController', ['$scope', 'Nodes', 'Notify', 'Buses', '$rootScope',
	function ($scope, NodesServiceUpdate, Notify, Buses, $rootScope) {

		// Find a list of Bus
		$scope.buses = Buses.getBuses();

		// Update existing Node
		this.update = function(updatedNode) {
			var node = updatedNode;
			console.log('CHECK UPDATE', $scope.node);

			NodesServiceUpdate.updateNode($scope.node, function(response) {

				Notify.sendMsg('UpdateNode', {'id': response._id});

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);