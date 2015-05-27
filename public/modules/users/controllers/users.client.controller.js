'use strict';

// Users controller

var usersApp = angular.module('users');

usersApp.controller('UsersController', ['$scope', '$stateParams', 'Authentication', 'Users', '$modal', '$log',
    function ($scope, $stateParams, Authentication, Users, $modal, $log) {

        this.authentication = Authentication;

        // Find a list of Users
        this.users = Users.getUsers();

        /********************************************************* OK *********************************************************/
        // Open a modal window to Create a single user record
        this.modalCreate = function (size, createUserForm) {

            var modalInstance = $modal.open({
                templateUrl: '/modules/users/views/create-user.client.view.html',
                controller: function ($scope, $modalInstance) {

                $scope.ok = function () {
                     if (createUserForm.$valid) {
                     $log.info('Form is valid');
                     $modalInstance.close();

                     } else {
                     $log.error('Form is not valid');
                     }
                     };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: size
            });

            modalInstance.result.then(function (selectedItem) {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        /********************************************************* OK *********************************************************/
        // Open a modal window to Update a single user record
        this.modalUpdate = function (size, selectedUser, updateUserForm) {

            var modalInstance = $modal.open({
                templateUrl: '/modules/users/views/edit-user.client.view.html',
                controller: function ($scope, $modalInstance, user) {
                    $scope.user = user;

                    $scope.ok = function () {
                        if (updateUserForm.$valid) {
                            $log.info('Form is valid');
                            $modalInstance.close($scope.user);

                        } else {
                            $log.error('Form is not valid');
                        }
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: size,
                resolve: {
                    user: function () {
                        return selectedUser;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        // Remove existing User
        this.remove = function (user) {
            if (user) {
                user.remove();

                for (var i in this.users) {
                    if (this.users [i] === user) {
                        this.users.splice(i, 1);
                    }
                }
            } else {
                this.user.remove(function () {
                });
            }
        };
    }
]);
/********************************************************* OK *********************************************************/
// CREATE CONTROLLER
usersApp.controller('UsersCreateController', ['$scope', 'Users', 'Notify',
    function ($scope, UsersServiceCreate, Notify) {

        $scope.channelOptions = [
            {id: 1, item: 'Admin Bus'},
            {id: 2, item: 'Developer'},
            {id: 3, item: 'Technical Monitoring'},
            {id: 4, item: 'Buisness Monitoring'}
        ];

        $scope.user = {};

        // Create new User
        $scope.create = function () {

            console.log('CHECK CREATE', $scope.user);
            // Redirect after save
            UsersServiceCreate.postUser($scope.user, function (response) {

                Notify.sendMsg('NewUser', {'id': response._id});

            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };
    }
]);
/********************************************************* OK *********************************************************/
// UPDATE CONTROLLER
usersApp.controller('UsersUpdateController', ['$scope', 'Users', 'Notify',
    function ($scope, UsersServiceUpdate, Notify) {

        $scope.channelOptions = [
            {id: 1, item: 'Admin Bus'},
            {id: 2, item: 'Developer'},
            {id: 3, item: 'Technical Monitoring'},
            {id: 4, item: 'Buisness Monitoring'}
        ];

        // Update existing Customer
        this.update = function(updatedUser) {
            var user = updatedUser;

            UsersServiceUpdate.updateUser($scope.user, function(response) {

                Notify.sendMsg('UpdateUser', {'id': response._id});

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);