'use strict';

// Services controller

var servicesApp = angular.module('services');

servicesApp.controller('ServicesController', ['$scope', '$stateParams', 'Authentication', 'Services', '$modal', '$log', '$rootScope', '$mdDialog',
	function ($scope, $stateParams, Authentication, Services, $modal, $log, $rootScope, $mdDialog) {

		this.authentication = Authentication;

		// Find a list of Services
		/*this.services = Services.getServices();*/

		// Recieve Event
		var self = this;
		$rootScope.$on('ServiceCreate', function(eventName, service) {
			self.services.push(service);
		});

		/* Window for Create New SERVICE */
		$scope.showModalCreateService = function(ev) {
			$mdDialog.show({
						controller: mdDialogCtrl,
						templateUrl: '/modules/services/views/create-service.client.view.html',
						parent: angular.element(document.body),
						targetEvent: ev,
						locals: { serviceUnit: $scope.sItem }
					})
					.then(function (answer) {
						$scope.status = 'You said the information was "' + answer + '".';
					}, function () {
						$scope.status = 'You cancelled the dialog.';
					});
		};

		var mdDialogCtrl = function ($scope, $mdDialog, serviceUnit) {
			$scope.serviceP  = serviceUnit;

			$scope.closeDialog = function() {
				// Easily hides most recent dialog shown...
				// no specific instance reference is needed.
				$mdDialog.hide();
			};
		};
	}
]);

servicesApp.config(['$mdThemingProvider', function ($mdThemingProvider) {
	$mdThemingProvider.theme('service-theme', 'default')
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
servicesApp.controller('ServicesCreateController', ['$scope', 'Services', 'Notify', 'Serviceunits', '$rootScope','$mdBottomSheet',
	function ($scope, Services, Notify, Serviceunits, $rootScope, $mdBottomSheet) {

		// Find a list of Component
		/*$scope.serviceunits = Serviceunits.getServiceunits();*/

		$scope.service = { parentServiceUnit: $scope.serviceP._id };

		/* Show the msg when Service Unit is Created */
		$scope.openBottomSheet = function() {
			$mdBottomSheet.show({
				template: '<md-bottom-sheet><h3 align="center">Create Service Worked !</h3></md-bottom-sheet>'
			});
		};

		// Create new Service
		$scope.create = function () {

			console.log('CHECK CREATE', $scope.service);
			// Redirect after save
			Services.postService($scope.service, function (service) {

				Notify.sendMsg('NewService', {'id': service._id});
				$rootScope.$broadcast('ServiceCreate', service);


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
		/*$scope.serviceunits = Serviceunits.getServiceunits();*/

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