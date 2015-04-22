'use strict';

angular.module('cockpit-app', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '/views/modules/login/home'
            })
        $routeProvider
            .when('/about', {
                templateUrl: '/views/about'
            })
        $routeProvider
            .when('/about', {
                templateUrl: '/views/about'
            })
        $routeProvider
            .when('/guide', {
                templateUrl: '/views/guide'
            })
        $routeProvider
            .when('/contact', {
                templateUrl: '/views/contact'
            })
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
    });

//    .controller('AppCrtl', function($scope) {
//        $scope.message = 'The app routing is working !';
//    });