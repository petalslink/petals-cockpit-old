'use strict';

// Setting up route
angular.module('buses').config(['$stateProvider',
	function($stateProvider) {
		// Buses state routing
		$stateProvider.
		state('listBuses', {
			url: '/buses',
			templateUrl: 'modules/buses/views/list-buses.client.view.html'
		}).
		state('createBus', {
			url: '/buses/create',
			templateUrl: 'modules/buses/views/create-bus.client.view.html'
		}).
		state('viewBus', {
			url: '/buses/:busId',
			templateUrl: 'modules/buses/views/bus-list-template.html'
		});
/*		state('editBus', {
			url: '/buses/:busId/edit',
			templateUrl: 'modules/buses/views/edit-bus.client.view.html'
		});*/
	}
]);