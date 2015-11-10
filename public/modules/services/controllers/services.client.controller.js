'use strict';

// Services controller

var servicesApp = angular.module('services');

servicesApp.controller('ServicesController', ['$scope', '$stateParams', 'Authentication', 'Services', '$modal', '$log', '$rootScope',
	function ($scope, $stateParams, Authentication, Services, $modal, $log, $rootScope) {

		this.authentication = Authentication;

		// Find a list of Services
		this.services = Services.getServices();

		// Recieve Event
		var self = this;
		$rootScope.$on('ServiceCreate', function(eventName, service) {
			self.services.push(service);
		});

		/********************************************************* OK *********************************************************/
			// Open a modal window to Create a single service record
		this.modalCreate = function (size, createServiceForm) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/services/views/create-service.client.view.html',
				controller: function ($scope, $modalInstance) {

					$scope.ok = function () {
						if (createServiceForm.$valid) {
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
			// Open a modal window to Update a single service record
		this.modalUpdate = function (size, selectedService, updateServiceForm) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/services/views/edit-service.client.view.html',
				controller: function ($scope, $modalInstance, service) {
					$scope.service = service;

					$scope.ok = function () {
						if (updateServiceForm.$valid) {
							$log.info('Form is valid');
							$modalInstance.close($scope.service);

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
					service: function () {
						return selectedService;
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

servicesApp.config(['$mdThemingProvider', function($mdThemingProvider) {
	$mdThemingProvider.theme('overview-theme', 'default')
		.primaryPalette('deep-purple', {
			'default': '600',
			'hue-1': '400',
			'hue-2': '300',
			'hue-3': '50'
		})
		.accentPalette('amber', {
			'default': '700',
			'hue-1': '400',
			'hue-2': '300',
			'hue-3': '200'
		});
}]);


servicesApp.config(['$mdThemingProvider', function($mdThemingProvider) {
	$mdThemingProvider.theme('overview-theme', 'default')
		.primaryPalette('deep-purple', {
			'default': '300',
			'hue-1': '200',
			'hue-2': '100',
			'hue-3': '50'
		})
		.accentPalette('amber', {
			'default': '300',
			'hue-1': '200',
			'hue-2': '100',
			'hue-3': '50'
		});
}]);


/********************************************************* OK *********************************************************/
// CREATE CONTROLLER
servicesApp.controller('ServicesCreateController', ['$scope', 'Services', 'Notify', 'Serviceunits', '$rootScope',
	function ($scope, Services, Notify, Serviceunits, $rootScope) {

		// Find a list of Component
		$scope.serviceunits = Serviceunits.getServiceunits();

		$scope.service = {};

		// Create new Service
		$scope.create = function () {

			console.log('CHECK CREATE', $scope.service);
			// Redirect after save
			Services.postService($scope.service, function (service) {

				Notify.sendMsg('NewService', {'id': service._id});
				$rootScope.$emit('ServiceCreate', service);


			}, function (errorResponse) {
				$scope.error = 'Could not Create Service !';
			});

		};
	}
]);
/********************************************************* OK *********************************************************/
// UPDATE CONTROLLER
servicesApp.controller('ServicesUpdateController', ['$scope', 'Services', 'Notify', 'Serviceunits', '$rootScope',
	function ($scope, Services, Notify, Serviceunits, $rootScope) {

		// Find a list of Component
		$scope.serviceunits = Serviceunits.getServiceunits();

		// Update existing Service
		this.update = function(updatedService) {
			var service = updatedService;
			console.log('CHECK UPDATE', $scope.service, $scope.sItem);

			Services.updateService($scope.service, $scope.sItem, function(response) {

				Notify.sendMsg('UpdateService', {'id': response._id});

			}, function(errorResponse) {
				$scope.error = 'Could not Update Service !';
			});
		};
	}
]);