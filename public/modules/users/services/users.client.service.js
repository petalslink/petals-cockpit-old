'use strict';

//Users service used to communicate Users REST endpoints

var usersApp = angular.module('users');

/********************************************************* OK *********************************************************/
usersApp.factory('Users', ['$resource',
    function ($resource) {

        var resource = $resource('users/:userId', {
                userId: '@_id'
            },
            {
                'update': {method: 'PUT'}
            });

        return {
            postUser: resource.save,
            updateUser: resource.update,
            deleteUser: resource.delete,
            getUsers: resource.query
        };
    }]);
/********************************************************* OK *********************************************************/
usersApp.factory('Notify', ['$rootScope',
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