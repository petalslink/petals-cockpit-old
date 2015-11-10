'use strict';

// service units controller

var serviceunitsApp = angular.module('serviceunits');

serviceunitsApp.controller('ServiceunitsController', ['$scope', '$stateParams', 'Authentication', 'Serviceunits', '$modal', '$log', '$rootScope',
	function ($scope, $stateParams, Authentication, Serviceunits, $modal, $log, $rootScope) {

		this.authentication = Authentication;

		// Find a list of service unit
		this.serviceunits = Serviceunits.getServiceunits();

		// Recieve Event
		var self = this;
		$rootScope.$on('ServiceunitCreate', function(eventName, serviceunit) {
			self.serviceunits.push(serviceunit);
		});

		/********************************************************* OK *********************************************************/
			// Open a modal window to Create a single service unit record
		this.modalCreate = function (size, createServiceunitForm) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/serviceunits/views/create-serviceunit.client.view.html',
				controller: function ($scope, $modalInstance) {

					$scope.ok = function () {
						if (createServiceunitForm.$valid) {
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
			// Open a modal window to Update a single service unit record
		this.modalUpdate = function (size, selectedServiceunit, updateServiceunitForm) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/serviceunits/views/edit-serviceunit.client.view.html',
				controller: function ($scope, $modalInstance, serviceunit) {
					$scope.serviceunit = serviceunit;

					$scope.ok = function () {
						if (updateServiceunitForm.$valid) {
							$log.info('Form is valid');
							$modalInstance.close($scope.serviceunit);

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
					serviceunit: function () {
						return selectedServiceunit;
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


serviceunitsApp.config(['$mdThemingProvider', function($mdThemingProvider) {
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


/********************************************************* OK *********************************************************/
// CREATE CONTROLLER
serviceunitsApp.controller('ServiceunitsCreateController', ['$scope', 'Serviceunits', 'Notify', 'Components', '$rootScope',
	function ($scope, Serviceunits, Notify, Components, $rootScope) {

		// Find a list of Component
		$scope.components = Components.getComponents();

		$scope.serviceunit = {};

		// Create new Service Unit
		$scope.create = function () {

			console.log('CHECK CREATE', $scope.serviceunit);
			// Redirect after save
			Serviceunits.postServiceunit($scope.serviceunit, function (serviceunit) {

				Notify.sendMsg('NewServiceunit', {'id': serviceunit._id});
				$rootScope.$emit('ServiceunitCreate', serviceunit);


			}, function (errorResponse) {
				$scope.error = 'Could not Create Service Unit !';
			});

		};
	}
]);
/********************************************************* OK *********************************************************/
// UPDATE CONTROLLER
serviceunitsApp.controller('ServiceunitsUpdateController', ['$scope', 'Serviceunits', 'Notify', 'Components', '$rootScope',
	function ($scope, Serviceunits, Notify, Components, $rootScope) {

		// Find a list of Component
		$scope.components = Components.getComponents();

		// Update existing Service Unit
		this.update = function(updatedServiceunit) {
			var serviceunit = updatedServiceunit;
			console.log('CHECK UPDATE', $scope.serviceunit, $scope.sItem);

			Serviceunits.updateServiceunit($scope.serviceunit, $scope.sItem, function(response) {

				Notify.sendMsg('UpdateServiceunit', {'id': response._id});

			}, function(errorResponse) {
				$scope.error = 'Could not Update Service Unit !';
			});
		};
	}
]);