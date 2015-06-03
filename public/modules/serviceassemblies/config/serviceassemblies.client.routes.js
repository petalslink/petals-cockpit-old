'use strict';

//Setting up route
angular.module('serviceassemblies').config(['$stateProvider',
	function($stateProvider) {
		// Serviceassemblies state routing
		$stateProvider.
		state('listServiceassemblies', {
			url: '/serviceassemblies',
			templateUrl: 'modules/serviceassemblies/views/list-serviceassemblies.client.view.html'
		}).
		state('createServiceassembly', {
			url: '/serviceassemblies/create',
			templateUrl: 'modules/serviceassemblies/views/create-serviceassembly.client.view.html'
		}).
		state('viewServiceassembly', {
			url: '/serviceassemblies/:serviceassemblyId',
			templateUrl: 'modules/serviceassemblies/views/view-serviceassembly.client.view.html'
		}).
		state('editServiceassembly', {
			url: '/serviceassemblies/:serviceassemblyId/edit',
			templateUrl: 'modules/serviceassemblies/views/edit-serviceassembly.client.view.html'
		});
	}
]);