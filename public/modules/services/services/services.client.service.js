'use strict';

//Services service used to communicate Service REST endpoints

var servicesApp = angular.module('services');

/********************************************************* OK *********************************************************/
servicesApp.factory('Services', ['$resource',
	function ($resource) {

		var resource = $resource('services/:serviceId', {
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
	}]);
/********************************************************* OK *********************************************************/
servicesApp.factory('Notify', ['$rootScope',
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