'use strict';

//Serviceunits service used to communicate Serviceunits REST endpoints
angular.module('serviceunits').factory('Serviceunits', ['$resource',
	function($resource) {
		return $resource('serviceunits/:serviceunitId', { serviceunitId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);