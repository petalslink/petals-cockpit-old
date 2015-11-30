'use strict';

var app = angular.module('core');

app.directive('dirComponentDisplay',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/component-display.client.view.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirComponentTree',
    function () {

        return {
            restrict: 'E',
/*            scope: {
                allItems: '='
            },*/
            transclude: true,
            templateUrl: '/modules/core/views/component-tree.client.view.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

/*usersApp.directive('dirUserList', ['Users', 'Notify',
    function (Users, Notify) {

        return {
            restrict: 'E',
            scope: {
                usersList: '=info',
                searchText: '=filter'
            },
            transclude: true,
            templateUrl: '/modules/users/views/user-list-template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);*/
