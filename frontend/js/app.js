'use strict';

angular
    .module('cockpit-app', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '/views/modules/login/home'
            })
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
    });

//    .controller('AppCrtl', function($scope) {
//        $scope.message = 'The app routing is working !';
//    });