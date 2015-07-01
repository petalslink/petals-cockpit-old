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
/********************************************************* OK *********************************************************/
// CREATE CONTROLLER
servicesApp.controller('ServicesCreateController', ['$scope', 'Services', 'Notify', '$rootScope',
	function ($scope, ServicesServiceCreate, Notify, $rootScope) {

		$scope.service = {};

		// Create new Service
		$scope.create = function () {

			console.log('CHECK CREATE', $scope.service);
			// Redirect after save
			ServicesServiceCreate.postService($scope.service, function (service) {

				Notify.sendMsg('NewService', {'id': service._id});
				$rootScope.$emit('ServiceCreate', service);


			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};
	}
]);
/********************************************************* OK *********************************************************/
// UPDATE CONTROLLER
servicesApp.controller('ServicesUpdateController', ['$scope', 'Services', 'Notify',
	function ($scope, ServicesServiceUpdate, Notify) {

		// Update existing Service
		this.update = function(updatedService) {
			var service = updatedService;

			ServicesServiceUpdate.updateService($scope.service, function(response) {

				Notify.sendMsg('UpdateService', {'id': response._id});

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);