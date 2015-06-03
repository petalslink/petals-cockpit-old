'use strict';

//Components service used to communicate Components REST endpoints
angular.module('components').factory('Components', ['$resource',
	function($resource) {
		return $resource('components/:componentId', { componentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);