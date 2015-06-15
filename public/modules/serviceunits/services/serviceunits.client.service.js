'use strict';

//Serviceunits service used to communicate Bus REST endpoints

var serviceunitsApp = angular.module('serviceunits');

/********************************************************* OK *********************************************************/
serviceunitsApp.factory('Serviceunits', ['$resource',
	function ($resource) {

		var resource = $resource('serviceunits/:serviceunitId', {
				serviceunitId: '@_id'
			},
			{
				'update': {method: 'PUT'}
			});

		return {
			postServiceunit: resource.save,
			updateServiceunit: resource.update,
			deleteServiceunit: resource.delete,
			getServiceunits: resource.query
		};
	}]);
/********************************************************* OK *********************************************************/
serviceunitsApp.factory('Notify', ['$rootScope',
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