'use strict';

// Buses controller

var busesApp = angular.module('buses');

busesApp.controller('BusesController', ['$scope', '$stateParams', 'Authentication', 'Buses', '$modal', '$log', '$rootScope', '$mdDialog',
	function ($scope, $stateParams, Authentication, Buses, $modal, $log, $rootScope,$mdDialog) {

		this.authentication = Authentication;

		// Find a list of Bus
		this.buses = Buses.getBuses();

		// Recieve Event
		var self = this;
		$rootScope.$on('BusCreate', function(eventName, bus) {
			self.buses.push(bus);
		});

		/* Window for Create New BUS */
		$scope.showModalCreateBus = function (ev, selectedBus) {
			$mdDialog.show({
				controller: DialogController,
				templateUrl: '/modules/buses/views/create-bus.client.view.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				resolve: {
					bus: function () {
						return selectedBus;
					}
				}
			})
				.then(function (answer) {
					$scope.status = 'You said the information was "' + answer + '".';
				}, function () {
					$scope.status = 'You cancelled the dialog.';
				});
		};

		function DialogController($scope, $mdDialog, bus) {
			$scope.hide = function () {
				$mdDialog.hide();
			};
			$scope.ok = function () {
				if ($mdDialog.$valid) {
					$log.info('Form is valid');
					$mdDialog.close();

				} else {
					$log.error('Form is not valid');
				}
			};
			$scope.cancel = function () {
				$mdDialog.cancel();
			};
			$scope.answer = function (answer) {
				$mdDialog.hide(answer);
			};
			$scope.bus = bus;
		}

/*		/!********************************************************* OK *********************************************************!/
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
		};*/

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

busesApp.config(['$mdThemingProvider', function($mdThemingProvider) {
	$mdThemingProvider.theme('bus-theme', 'default')
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
busesApp.controller('BusesCreateController', ['$scope', 'Buses', 'Notify', '$rootScope', '$mdBottomSheet',
	function ($scope, Buses, Notify, $rootScope, $mdBottomSheet) {

		$scope.bus = {};

		/* Show the msg when Bus is Created */
		$scope.openBottomSheet = function() {
			$mdBottomSheet.show({
				template: '<md-bottom-sheet><h3 align="center">Create Bus Worked !</h3></md-bottom-sheet>'
			});
		};


		// Create new Bus
		$scope.create = function () {

			console.log('CHECK CREATE', $scope.bus);
			// Redirect after save
			Buses.postBus($scope.bus, function (bus) {

				Notify.sendMsg('NewBus', {'id': bus._id});
				$rootScope.$broadcast('BusCreate', bus);


			}, function () {
				$scope.error = 'Could not Create Bus !';
			});

		};
	}
]);
/********************************************************* OK *********************************************************/
// UPDATE CONTROLLER
busesApp.controller('BusesUpdateController', ['$scope', 'Buses', 'Notify',
	function ($scope, Buses, Notify) {

		// Update existing Bus
		this.update = function(updatedBus) {
			var bus = updatedBus;
			console.log('CHECK UPDATE', $scope.bus, $scope.sItem);

			Buses.updateBus($scope.bus, $scope.sItem, function(response) {

				Notify.sendMsg('UpdateBus', {'id': response._id});

			}, function(errorResponse) {
					$scope.error = 'Could not Update Bus !';
			});
		};
	}
]);