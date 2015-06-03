'use strict';

//Setting up route
angular.module('components').config(['$stateProvider',
	function($stateProvider) {
		// Components state routing
		$stateProvider.
		state('listComponents', {
			url: '/components',
			templateUrl: 'modules/components/views/list-components.client.view.html'
		}).
		state('createComponent', {
			url: '/components/create',
			templateUrl: 'modules/components/views/create-component.client.view.html'
		}).
		state('viewComponent', {
			url: '/components/:componentId',
			templateUrl: 'modules/components/views/view-component.client.view.html'
		}).
		state('editComponent', {
			url: '/components/:componentId/edit',
			templateUrl: 'modules/components/views/edit-component.client.view.html'
		});
	}
]);