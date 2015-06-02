'use strict';

// Users directives

var usersApp = angular.module('users');

// Transclusion for integration bus list template html

usersApp.directive('dirUserList', ['Users', 'Notify',
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
]);

usersApp.directive('dirSupUser', ['Users', 'Notify',
    function (Users, Notify) {

        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            template: '<button class="btn btn-default" ng-click="removeUser()"><i class="glyphicon glyphicon-trash"></i></button>',
            link: function ($scope, element, attrs) {
                $scope.removeUser = function() {
                    Users.deleteUser({userId: $scope.user._id}, function() {
                        console.log($scope.user.firstName, $scope.user.lastName, $scope.user._id, 'has been deleted !');
                    });
                };
            }
        };
    }
]);
