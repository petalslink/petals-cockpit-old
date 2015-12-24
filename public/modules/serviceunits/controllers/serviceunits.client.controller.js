'use strict';

// service units controller

var serviceunitsApp = angular.module('serviceunits');

serviceunitsApp.controller('ServiceunitsController', ['$scope', '$stateParams', 'Authentication', 'Serviceunits', '$modal', '$log', '$rootScope', '$mdDialog',
	function ($scope, $stateParams, Authentication, Serviceunits, $modal, $log, $rootScope, $mdDialog) {

		this.authentication = Authentication;

		// Find a list of service unit
		/*this.serviceunits = Serviceunits.getServiceunits();*/

		// Recieve Event
		var self = this;
		$rootScope.$on('ServiceunitCreate', function(eventName, serviceunit) {
			self.serviceunits.push(serviceunit);
		});

		/* Window for Create New SERVICE UNIT */
		$scope.showModalCreateSu = function(ev) {
			$mdDialog.show({
						controller: mdDialogCtrl,
						templateUrl: '/modules/serviceunits/views/create-serviceunit.client.view.html',
						parent: angular.element(document.body),
						targetEvent: ev,
						locals: { component: $scope.sItem }
					})
					.then(function (answer) {
						$scope.status = 'You said the information was "' + answer + '".';
					}, function () {
						$scope.status = 'You cancelled the dialog.';
					});
		};

		var mdDialogCtrl = function ($scope, $mdDialog, component) {
			$scope.suP  = component;

			$scope.closeDialog = function() {
				// Easily hides most recent dialog shown...
				// no specific instance reference is needed.
				$mdDialog.hide();
			};
		};
	}
]);

serviceunitsApp.config(['$mdThemingProvider', function($mdThemingProvider) {
	$mdThemingProvider.theme('su-theme', 'default')
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
serviceunitsApp.controller('ServiceunitsCreateController', ['$scope', 'Serviceunits', 'Notify', 'Components', '$rootScope', '$mdBottomSheet',
	function ($scope, Serviceunits, Notify, Components, $rootScope, $mdBottomSheet) {

		// Find a list of Component
		/*$scope.components = Components.getComponents();*/

		/*$scope.serviceunit = {};*/
		$scope.serviceunit = { parentComponent: $scope.suP._id };

		/* Show the msg when Component is Created */
		$scope.openBottomSheet = function() {
			$mdBottomSheet.show({
				template: '<md-bottom-sheet><h3 align="center">Create Service Unit Worked !</h3></md-bottom-sheet>'
			});
		};

		// Create new Service Unit
		$scope.create = function () {

			console.log('CHECK CREATE', $scope.serviceunit);
			// Redirect after save
			Serviceunits.postServiceunit($scope.serviceunit, function (serviceunit) {

				Notify.sendMsg('NewServiceunit', {'id': serviceunit._id});
				$rootScope.$broadcast('ServiceunitCreate', serviceunit);


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
		/*$scope.components = Components.getComponents();*/

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