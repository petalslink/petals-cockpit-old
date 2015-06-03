'use strict';

//Services service used to communicate Services REST endpoints
angular.module('services').factory('Services', ['$resource',
	function($resource) {
		return $resource('services/:serviceId', { serviceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);