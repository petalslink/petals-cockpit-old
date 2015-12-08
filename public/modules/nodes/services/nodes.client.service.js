'use strict';

//Services service used to communicate Service REST endpoints

var nodesApp = angular.module('nodes');

/********************************************************* OK *********************************************************/
nodesApp.factory('Nodes', ['$resource',
	function ($resource) {

		var resource = $resource('nodes/:nodeId', {
				nodeId: '@_id'
			},
			{
				'update': {method: 'PUT'}
			});

		return {
			postNode: resource.save,
			updateNode: resource.update,
			deleteNode: resource.delete,
			getNodes: resource.query
		};
	}]);
/********************************************************* OK *********************************************************/
nodesApp.factory('Notify', ['$rootScope',
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

nodesApp.factory('verifyDelete', function($mdDialog) {

	return function(node) {

		var confirm = $mdDialog.confirm()

				.title('Confirm Your Choice')

				.content('Are you sure you want to delete ' + node.name + ' ' + '?')

				.ariaLabel('Delete Node')

				.ok('Delete Node')

				.cancel('Cancel');

		return $mdDialog.show(confirm);

	}

});