'use strict';

//Components service used to communicate Component REST endpoints

var componentsApp = angular.module('components');

/********************************************************* OK *********************************************************/
componentsApp.factory('Components', ['$resource',
	function ($resource) {

		var resource = $resource('components/:componentId', {
				componentId: '@_id'
			},
			{
				'update': {method: 'PUT'}
			});

		return {
			postComponent: resource.save,
			updateComponent: resource.update,
			deleteComponent: resource.delete,
			getComponents: resource.query
		};
	}]);
/********************************************************* OK *********************************************************/
componentsApp.factory('Notify', ['$rootScope',
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