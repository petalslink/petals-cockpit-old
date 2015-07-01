'use strict';

// Users controller

var usersApp = angular.module('users');

usersApp.controller('UsersController', ['$scope', '$stateParams', 'Authentication', 'Users', '$modal', '$log', '$rootScope',
    function ($scope, $stateParams, Authentication, Users, $modal, $log, $rootScope) {

        this.authentication = Authentication;

        // Find a list of Users
        this.users = Users.getUsers();

        // Retrieve Event
        var self = this;
        $rootScope.$on('UserCreate', function(eventName, user) {
            self.users.push(user);
        });

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
    }
]);
/********************************************************* OK *********************************************************/
// CREATE CONTROLLER
usersApp.controller('UsersCreateController', ['$scope', 'Users', 'Notify', '$rootScope',
    function ($scope, UsersServiceCreate, Notify, $rootScope) {

        $scope.channelCountry = [
            {id: 1, item: 'Austria'},
            {id: 2, item: 'Belgium'},
            {id: 3, item: 'Bulgaria'},
            {id: 4, item: 'Croatia'},
            {id: 5, item: 'Cyprus'},
            {id: 6, item: 'Czech Republic'},
            {id: 7, item: 'Denmark'},
            {id: 8, item: 'Estonia'},
            {id: 9, item: 'Finland'},
            {id: 10, item: 'France'},
            {id: 11, item: 'Germany'},
            {id: 12, item: 'Greece'},
            {id: 13, item: 'Hungary'},
            {id: 14, item: 'Ireland'},
            {id: 15, item: 'Italy'},
            {id: 16, item: 'Latvia'},
            {id: 17, item: 'Lithuania'},
            {id: 18, item: 'Luxembourg'},
            {id: 19, item: 'Malta'},
            {id: 20, item: 'Netherlands'},
            {id: 21, item: 'Poland'},
            {id: 22, item: 'Portugal'},
            {id: 23, item: 'Romania'},
            {id: 24, item: 'Slovakia'},
            {id: 25, item: 'Slovenia'},
            {id: 26, item: 'Spain'},
            {id: 27, item: 'Sweden'},
            {id: 28, item: 'United Kingdom'}
        ];

        $scope.channelGender = [
            {id: 1, item: 'Male'},
            {id: 2, item: 'Female'}
        ];

        $scope.user = {};

        // Create new User
        $scope.create = function () {

            console.log('CHECK CREATE', $scope.user);
            // Redirect after save
            UsersServiceCreate.postUser($scope.user, function (user) {

                Notify.sendMsg('NewUser', {'id': user._id});
                $rootScope.$emit('UserCreate', user);

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

        $scope.channelCountry = [
            {id: 1, item: 'Austria'},
            {id: 2, item: 'Belgium'},
            {id: 3, item: 'Bulgaria'},
            {id: 4, item: 'Croatia'},
            {id: 5, item: 'Cyprus'},
            {id: 6, item: 'Czech Republic'},
            {id: 7, item: 'Denmark'},
            {id: 8, item: 'Estonia'},
            {id: 9, item: 'Finland'},
            {id: 10, item: 'France'},
            {id: 11, item: 'Germany'},
            {id: 12, item: 'Greece'},
            {id: 13, item: 'Hungary'},
            {id: 14, item: 'Ireland'},
            {id: 15, item: 'Italy'},
            {id: 16, item: 'Latvia'},
            {id: 17, item: 'Lithuania'},
            {id: 18, item: 'Luxembourg'},
            {id: 19, item: 'Malta'},
            {id: 20, item: 'Netherlands'},
            {id: 21, item: 'Poland'},
            {id: 22, item: 'Portugal'},
            {id: 23, item: 'Romania'},
            {id: 24, item: 'Slovakia'},
            {id: 25, item: 'Slovenia'},
            {id: 26, item: 'Spain'},
            {id: 27, item: 'Sweden'},
            {id: 28, item: 'United Kingdom'}
        ];

        $scope.channelGender = [
            {id: 1, item: 'Male'},
            {id: 2, item: 'Female'}
        ];

        // Update existing User
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