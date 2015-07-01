'use strict';

// Buses controller

var busesApp = angular.module('buses');

busesApp.controller('BusesController', ['$scope', '$stateParams', 'Authentication', 'Buses', '$modal', '$log', '$rootScope',
	function ($scope, $stateParams, Authentication, Buses, $modal, $log, $rootScope) {

		this.authentication = Authentication;

		// Find a list of Bus
		this.buses = Buses.getBuses();

		// Recieve Event
		var self = this;
		$rootScope.$on('BusCreate', function(eventName, bus) {
			self.buses.push(bus);
		});

		/********************************************************* OK *********************************************************/
			// Open a modal window to Create a single bus record
		this.modalCreate = function (size, createBusForm) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/buses/views/create-bus.client.view.html',
				controller: function ($scope, $modalInstance) {

					$scope.ok = function () {
						if (createBusForm.$valid) {
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
			// Open a modal window to Update a single bus record
		this.modalUpdate = function (size, selectedBus, updateBusForm) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/buses/views/edit-bus.client.view.html',
				controller: function ($scope, $modalInstance, bus) {
					$scope.bus = bus;

					$scope.ok = function () {
						if (updateBusForm.$valid) {
							$log.info('Form is valid');
							$modalInstance.close($scope.bus);

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
					bus: function () {
						return selectedBus;
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
busesApp.controller('BusesCreateController', ['$scope', 'Buses', 'Notify', '$rootScope',
	function ($scope, BusesServiceCreate, Notify, $rootScope) {

		$scope.bus = {};

		// Create new Bus
		$scope.create = function () {

			console.log('CHECK CREATE', $scope.bus);
			// Redirect after save
			BusesServiceCreate.postBus($scope.bus, function (bus) {

				Notify.sendMsg('NewBus', {'id': bus._id});
				$rootScope.$emit('BusCreate', bus);


			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};
	}
]);
/********************************************************* OK *********************************************************/
// UPDATE CONTROLLER
busesApp.controller('BusesUpdateController', ['$scope', 'Buses', 'Notify',
	function ($scope, BusesServiceUpdate, Notify) {

		// Update existing Bus
		this.update = function(updatedBus) {
			var bus = updatedBus;

			BusesServiceUpdate.updateBus($scope.bus, function(response) {

				Notify.sendMsg('UpdateBus', {'id': response._id});

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);