'use strict';

// Components controller

var componentsApp = angular.module('components');

componentsApp.controller('ComponentsController', ['$scope', '$stateParams', 'Authentication', 'Components', '$modal', '$log', '$rootScope',
	function ($scope, $stateParams, Authentication, Components, $modal, $log, $rootScope) {

		this.authentication = Authentication;

		// Find a list of Component
		this.components = Components.getComponents();

		// Recieve Event
		var self = this;
		$rootScope.$on('ComponentCreate', function(eventName, component) {
			self.components.push(component);
		});

		/********************************************************* OK *********************************************************/
			// Open a modal window to Create a single component record
		this.modalCreate = function (size, createComponentForm) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/components/views/create-component.client.view.html',
				controller: function ($scope, $modalInstance) {

					$scope.ok = function () {
						if (createComponentForm.$valid) {
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
componentsApp.controller('ComponentsCreateController', ['$scope', 'Components', 'Notify', 'Nodes', '$rootScope',
	function ($scope, Components, Notify, Nodes, $rootScope) {

		// Find a list of Node
		$scope.nodes = Nodes.getNodes();

		$scope.component = {};

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