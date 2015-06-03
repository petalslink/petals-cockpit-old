'use strict';

//Nodes service used to communicate Nodes REST endpoints
angular.module('nodes').factory('Nodes', ['$resource',
	function($resource) {
		return $resource('nodes/:nodeId', { nodeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);