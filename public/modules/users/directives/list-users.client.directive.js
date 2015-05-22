'use strict';

// Users directives

var usersApp = angular.module('users');

// Transclusion for integration customer list template html
usersApp.directive('dirUserList', ['Users', 'Notify',
    function (Users, Notify) {

        return {
            restrict: 'E',
            scope: {
                usersList: '=info'
            },
            transclude: true,
            templateUrl: '/modules/users/views/user-list-template.html',
            link: function ($scope, element, attrs) {

                //when a new user is added, update the user list

                Notify.getMsg('NewUser', function (event, data) {

                    $scope.usersCtrl = Users.query();

                });
                $scope.removeUser = function (user) {
                    Users.deleteUser(user, function () {
                        console.log('PIPO !!!');
                    });
                };
/*                $scope.saveUser = function (user) {
                    Users.postUser(user, function () {
                        console.log('MARIO !!!');
                    });
                };
                $scope.updateUser = function (user) {
                    Users.updateUser(user, function () {
                        console.log('JOJO !!!');
                    });
                };*/
            }
        };
    }]);