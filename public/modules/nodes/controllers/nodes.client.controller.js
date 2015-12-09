'use strict';

// Nodes controller

var nodesApp = angular.module('nodes');

nodesApp.controller('NodesController', ['$scope', '$stateParams', 'Authentication', 'Nodes', '$modal', '$log', '$rootScope', '$mdDialog', 'verifyDelete',
	function ($scope, $stateParams, Authentication, Nodes, $modal, $log, $rootScope, $mdDialog, verifyDelete) {

		this.authentication = Authentication;

		// Find a list of Node
		this.nodes = Nodes.getNodes();

		// Recieve Event
		var self = this;
		$rootScope.$on('NodeCreate', function(eventName, node) {
			self.nodes.push(node);
		});

		/* Window for Create New NODE */
		$scope.showModalCreateNode = function(ev) {
			$mdDialog.show({
						controller: mdDialogCtrl,
						templateUrl: '/modules/nodes/views/create-node.client.view.html',
						parent: angular.element(document.body),
						targetEvent: ev,
						locals: { bus: $scope.sItem }
					})
					.then(function (answer) {
						$scope.status = 'You said the information was "' + answer + '".';
					}, function () {
						$scope.status = 'You cancelled the dialog.';
					});
		};

		var mdDialogCtrl = function ($scope, $mdDialog, bus) {
			$scope.nodeP  = bus;

			$scope.closeDialog = function() {
				// Easily hides most recent dialog shown...
				// no specific instance reference is needed.
				$mdDialog.hide();
			};
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

		$scope.delete = function (node) {

			verifyDelete(node).then(function () {

				var index = $scope.nodes.indexOf(node);

				$scope.nodes.splice(index, 1);

			});

		}

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
nodesApp.controller('NodesCreateController', ['$scope', 'Nodes', 'Notify', 'Buses', '$rootScope', '$mdBottomSheet',
	function ($scope, Nodes, Notify, Buses, $rootScope, $mdBottomSheet) {

		// Find a list of Bus
/*		$scope.buses = Buses.getBuses();*/

/*		$scope.node = {};*/
		$scope.node = {	parentBus: $scope.nodeP._id };

		/* Show the msg when Node is Created */
		$scope.openBottomSheet = function() {
			$mdBottomSheet.show({
				template: '<md-bottom-sheet><h3 align="center">Create Node Worked !</h3></md-bottom-sheet>'
			});
		};

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