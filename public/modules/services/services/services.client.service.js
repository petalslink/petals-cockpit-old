'use strict';

//Services service used to communicate Services REST endpoints

var servicesApp = angular.module('services');

servicesApp.factory('Services', ['$resource',
	function($resource) {

		var resource = $resource('buses/:busId', {
				serviceId: '@_id'
			},
			{
				'update': {method: 'PUT'}
			});

		return {
			postService: resource.save,
			updateService: resource.update,
			deleteService: resource.delete,
			getServices: resource.query
		};
	}
]);