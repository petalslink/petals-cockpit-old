(function(angular) {
  'use strict';
angular.module('cockpit-app', ['ngRoute', 'ngAnimate'])
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
    })
     .controller('MainController', function($scope, $route, $routeParams, $location) {
         $scope.$route = $route;
         $scope.$location = $location;
         $scope.$routeParams = $routeParams;
     })

     .controller('AboutController', function($scope, $routeParams) {
         $scope.name = "AboutController";
         $scope.params = $routeParams;
     })

     .controller('GuideController', function($scope, $routeParams) {
         $scope.name = "GuideController";
         $scope.params = $routeParams;
     })

     .controller('ContactController', function($scope, $routeParams) {
         $scope.name = "ContactController";
         $scope.params = $routeParams;
     })

     .controller('LoginController', function($scope, $routeParams) {
         $scope.name = "LoginController";
         $scope.params = $routeParams;
     })

    .config(function($routeProvider) {
        $routeProvider
            .when('/about', {
                templateUrl: '/views/about',
                controller: 'AboutController',
            })
            .when('/guide', {
                templateUrl: '/views/guide',
                controller: 'GuideController'
            })
            .when('/contact', {
                templateUrl: '/views/contact',
                controller: 'ContactController'
            })
            .when('/login', {
                templateUrl: '/views/modules/login/home',
                controller: 'LoginController'
            })
            .otherwise({
                redirectTo: '/'
            });

    });
})(window.angular);