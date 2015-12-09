'use strict';

// Components controller

var componentsApp = angular.module('components');

componentsApp.controller('ComponentsController', ['$scope', '$stateParams', 'Authentication', 'Components', '$modal', '$log', '$rootScope', '$mdDialog',
	function ($scope, $stateParams, Authentication, Components, $modal, $log, $rootScope, $mdDialog) {

		this.authentication = Authentication;

		// Find a list of Component
		this.components = Components.getComponents();

		// Recieve Event
		var self = this;
		$rootScope.$on('ComponentCreate', function(eventName, component) {
			self.components.push(component);
		});

		/* Window for Create New COMPONENT */
		$scope.showModalCreateComponent = function(ev) {
			$mdDialog.show({
						controller: mdDialogCtrl,
						templateUrl: '/modules/components/views/create-component.client.view.html',
						parent: angular.element(document.body),
						targetEvent: ev,
						locals: { node: $scope.sItem }
					})
					.then(function (answer) {
						$scope.status = 'You said the information was "' + answer + '".';
					}, function () {
						$scope.status = 'You cancelled the dialog.';
					});
		};

		var mdDialogCtrl = function ($scope, $mdDialog, node) {
			$scope.componentP  = node;

			$scope.closeDialog = function() {
				// Easily hides most recent dialog shown...
				// no specific instance reference is needed.
				$mdDialog.hide();
			};
		};

		/********************************************************* OK *********************************************************/
			// Open a modal window to Update a single component record
		this.modalUpdate = function (size, selectedComponent, updateComponentForm) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/components/views/edit-component.client.view.html',
				controller: function ($scope, $modalInstance, component) {
					$scope.component = component;

					$scope.ok = function () {
						if (updateComponentForm.$valid) {
							$log.info('Form is valid');
							$modalInstance.close($scope.component);

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
					component: function () {
						return selectedComponent;
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


componentsApp.config(['$mdThemingProvider', function($mdThemingProvider) {
	$mdThemingProvider.theme('component-theme', 'default')
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
componentsApp.controller('ComponentsCreateController', ['$scope', 'Components', 'Notify', 'Nodes', '$rootScope', '$mdBottomSheet',
	function ($scope, Components, Notify, Nodes, $rootScope, $mdBottomSheet) {

		// Find a list of Node
/*		$scope.nodes = Nodes.getNodes();*/

/*		$scope.component = {};*/
		$scope.component = {	parentServer: $scope.componentP._id };

		/* Show the msg when Component is Created */
		$scope.openBottomSheet = function() {
			$mdBottomSheet.show({
				template: '<md-bottom-sheet><h3 align="center">Create Component Worked !</h3></md-bottom-sheet>'
			});
		};

		// Create new Component
		$scope.create = function () {

			console.log('CHECK CREATE', $scope.component);
			// Redirect after save
			Components.postComponent($scope.component, function (component) {

				Notify.sendMsg('NewComponent', {'id': component._id});
				$rootScope.$broadcast('ComponentCreate', component);


			}, function (errorResponse) {
				$scope.error = 'Could not Create Component !';
			});

		};
	}
]);
/********************************************************* OK *********************************************************/
// UPDATE CONTROLLER
componentsApp.controller('ComponentsUpdateController', ['$scope', 'Components', 'Notify', 'Nodes', '$rootScope',
	function ($scope, Components, Notify, Nodes, $rootScope) {

		// Find a list of Node
		$scope.nodes = Nodes.getNodes();


		// Update existing Component
		this.update = function(updatedComponent) {
			var component = updatedComponent;
			console.log('CHECK UPDATE', $scope.component, $scope.sItem);

			Components.updateComponent($scope.component, $scope.sItem, function(response) {

				Notify.sendMsg('UpdateComponent', {'id': response._id});

			}, function(errorResponse) {
				$scope.error = 'Could not Update Component !';
			});
		};
	}
]);