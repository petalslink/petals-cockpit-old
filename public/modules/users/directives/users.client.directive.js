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
            template: '<md-button class="md-fab md-mini md-accent md-hue-1" aria-label="Edit" ng-click="removeUser()"><md-tooltip md-direction="bottom">Remove {{user.name}}</md-tooltip><md-icon class="material-icons md-24 md-primary">delete</md-icon></md-button>',
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

usersApp.directive('dirUpUser', ['Users',
    function (Users) {

        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            template: '<md-button class="md-fab md-mini md-accent md-hue-1" flex-sm="100" flex-md="100" flex-gt-md="auto" aria-label="Edit" ng-click="updUser()"><md-tooltip md-direction="bottom">Edit {{user.name}}</md-tooltip><md-icon class="material-icons md-24 md-primary">edit</md-icon></md-button>',
            link: function ($scope, element, attrs) {
                $scope.updUser = function() {

                };
            }
        };
    }
]);

/*
usersApp.directive('dirMsgUpUser', ['Users',
    function (Users) {

        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            template: '<md-bottom-sheet><h3 align="center">Update {{user.firstName}} {{user.lastName}} worked !</h3></md-bottom-sheet>',
            link: function ($scope, element, attrs) {
                $scope.updUser = function() {

                };
            }
        };
    }
]);*/
