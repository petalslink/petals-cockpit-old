'use strict';

// Nodes controller

var nodesApp = angular.module('nodes');

nodesApp.controller('NodesController', ['$scope', '$stateParams', 'Authentication', 'Nodes', '$modal', '$log', '$rootScope', '$mdDialog', 'verifyDelete',
	function ($scope, $stateParams, Authentication, Nodes, $modal, $log, $rootScope, $mdDialog, verifyDelete) {

		this.authentication = Authentication;

		// Find a list of Node
		/*this.nodes = Nodes.getNodes();*/

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

		/* Loading States List */
		$scope.state = null;
		$scope.states = null;

		$scope.loadStates = function() {

			$scope.states =  $scope.states  || [
					{id: 1, name: 'Shutdown'},
					{id: 2, name: 'Started'}
				];
		};

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

		$scope.stateData = [
			{
				'title': 'What would you want to have as state ?',
				'state': 1
			}
		];

		/* Loading States List */
		$scope.state = null;
		$scope.states = null;

		$scope.loadStates = function() {

			$scope.states =  $scope.states  || [
					{id: 1, name: 'Shutdown'},
					{id: 2, name: 'Started'}
				];
		};

		$scope.$on(function (event, node) {
			$scope.states.push(node);
			console.log('May Be Something Happens !!!!!!');

		});

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