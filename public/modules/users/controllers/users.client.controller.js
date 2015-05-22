'use strict';

// Users controller

var usersApp = angular.module('users');

usersApp.controller('UsersController', ['$scope', '$stateParams', 'Authentication', 'Users', '$modal', '$log',
    function ($scope, $stateParams, Authentication, Users, $modal, $log) {

        this.authentication = Authentication;

        // Find a list of Users
        this.users = Users.getUsers();

        //*******************************************************************************************************************************************
        // Open a modal window to Create a single user record
        this.modalCreate = function (size, createUserForm) {

            var modalInstance = $modal.open({
                templateUrl: '/modules/users/views/create-user.client.view.html',
                controller: function ($scope, $modalInstance) {

                    /*                    $scope.ok = function () {
                     if (createUserForm.$valid) {
                     $log.info('Form is valid');
                     $modalInstance.close();

                     } else {
                     $log.error('Form is not valid');
                     }
                     };*/

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


        //*******************************************************************************************************************************************
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
                user.$remove();

                for (var i in this.users) {
                    if (this.users [i] === user) {
                        this.users.splice(i, 1);
                    }
                }
            } else {
                this.user.$remove(function () {
                });
            }
        };


    }
]);

// CREATE CONTROLLER
usersApp.controller('UsersCreateController', ['$scope', 'Users', 'Notify',
    function ($scope, UsersService, Notify) {

        $scope.channelOptions = [
            {id: 1, item: 'Admin Bus'},
            {id: 2, item: 'Developer'},
            {id: 3, item: 'Technical Monitoring'},
            {id: 4, item: 'Buisness Monitoring'}
        ];

        $scope.user = {};

        // Create new User
        $scope.create = function () {
            // Create new User object
            /*            var user = {
             firstName: this.firstName,
             surname: this.surname,
             username: this.username,
             suburb: this.suburb,
             country: this.country,
             industry: this.industry,
             email: this.email,
             phone: this.phone,
             referred: this.referred,
             channel: this.channel
             };*/
            console.log('CHECK', $scope.user);
            // Redirect after save
            UsersService.postUser($scope.user, function (response) {

                Notify.sendMsg('NewUser', {'id': response._id});

            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };
    }
]);

// UPDATE CONTROLLER
usersApp.controller('UsersUpdateController', ['$scope', 'Users',
    function ($scope, Users) {

        $scope.channelOptions = [
            {id: 1, item: 'Admin Bus'},
            {id: 2, item: 'Developer'},
            {id: 3, item: 'Technical Monitoring'},
            {id: 4, item: 'Buisness Monitoring'}
        ];

        // Update existing Customer
        this.update = function (updatedUser) {
            var user = updatedUser;

            user.$update(function () {

            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);

/*		// Create new User
 $scope.create = function() {
 // Create new User object
 var user = new Users ({
 firstName: this.firstName,
 surname: this.surname,
 suburb: this.suburb,
 country: this.country,
 industry: this.industry,
 email: this.email,
 phone: this.phone,
 referred: this.referred,
 channel: this.channel
 });

 // Redirect after save
 user.$save(function(response) {
 $location.path('users/' + response._id);

 // Clear form fields
 $scope.firstName = '';
 $scope.surname = '';
 $scope.suburb = '';
 $scope.country = '';
 $scope.industry = '';
 $scope.email = '';
 $scope.phone = '';
 $scope.referred = '';
 $scope.channel = '';

 }, function(errorResponse) {
 $scope.error = errorResponse.data.message;
 });
 };

 // Remove existing User
 $scope.remove = function(user) {
 if ( user ) {
 user.$remove();

 for (var i in $scope.users) {
 if ($scope.users [i] === user) {
 $scope.users.splice(i, 1);
 }
 }
 } else {
 $scope.user.$remove(function() {
 $location.path('users');
 });
 }
 };

 // Update existing User
 $scope.update = function() {
 var user = $scope.user;

 user.$update(function() {
 $location.path('users/' + user._id);
 }, function(errorResponse) {
 $scope.error = errorResponse.data.message;
 });
 };


 // Find existing User
 $scope.findOne = function() {
 $scope.user = Users.get({
 userId: $stateParams.userId
 });
 };*/
