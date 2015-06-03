'use strict';

//Serviceassemblies service used to communicate Serviceassemblies REST endpoints
angular.module('serviceassemblies').factory('Serviceassemblies', ['$resource',
	function($resource) {
		return $resource('serviceassemblies/:serviceassemblyId', { serviceassemblyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);