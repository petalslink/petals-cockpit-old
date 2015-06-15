'use strict';

//Setting up route
angular.module('serviceunits').config(['$stateProvider',
	function($stateProvider) {
		// Serviceunits state routing
		$stateProvider.
		state('listServiceunits', {
			url: '/serviceunits',
			templateUrl: 'modules/serviceunits/views/list-serviceunits.client.view.html'
		}).
		state('createServiceunit', {
			url: '/serviceunits/create',
			templateUrl: 'modules/serviceunits/views/create-serviceunit.client.view.html'
		}).
		state('viewServiceunit', {
			url: '/serviceunits/:serviceunitId',
			templateUrl: 'modules/serviceunits/views/serviceunit-list-template.html'
		});
/*		state('editServiceunit', {
			url: '/serviceunits/:serviceunitId/edit',
			templateUrl: 'modules/serviceunits/views/edit-serviceunit.client.view.html'
		});*/
	}
]);