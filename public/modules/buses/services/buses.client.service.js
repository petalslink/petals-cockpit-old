'use strict';

//Buses service used to communicate Bus REST endpoints

var busesApp = angular.module('buses');

/********************************************************* OK *********************************************************/
busesApp.factory('Buses', ['$resource',
	function ($resource) {

		var resource = $resource('buses/:busId', {
				busId: '@_id'
			},
			{
				'update': {method: 'PUT'}
			});

		return {
			postBus: resource.save,
			updateBus: resource.update,
			deleteBus: resource.delete,
			getBuses: resource.query
		};
	}]);
/********************************************************* OK *********************************************************/
busesApp.factory('Notify', ['$rootScope',
	function ($rootScope) {

		var notify = {};

		notify.sendMsg = function (msg, data) {
			data = data || {};
			$rootScope.$emit(msg.data);

			console.log('message sent !');
		};

		notify.getMsg = function (msg, func, scope) {
			var unbind = $rootScope.$on(msg, func);

			if (scope) {
				scope.$on('destroy', unbind);
			}
		};

		return notify;
	}
]);