'use strict';

/* Controllers */

angular.module('cockpit-app.controllers', []).
    controller('AppCtrl', function ($scope, $http) {

        $http({
            method: 'GET',
            url: '/api/name'
        }).
        success(function (data, status, headers, config) {
            $scope.name = data.name;
        }).
        error(function (data, status, headers, config) {
            $scope.name = 'Error!';
        });
    
    }).

    controller('TestCtrl1', function ($scope) {
        $scope.name = "TestCtrl1";
        $scope.params = $routeParams;
     }).
    controller('TestCtrl2', function ($scope) {
        $scope.name = "TestCtrl2";
        $scope.params = $routeParams;
    }).
    controller('MainController', function($scope, $route, $routeParams, $location) {
        $scope.name = "MainController";
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
    }).
    controller('AboutController', function($scope, $routeParams) {
        $scope.name = "AboutController";
        $scope.params = $routeParams;
    }).
    controller('GuideController', function($scope, $routeParams) {
        $scope.name = "GuideController";
        $scope.params = $routeParams;
    }).
    controller('ContactController', function($scope, $routeParams) {
        $scope.name = "ContactController";
        $scope.params = $routeParams;
    }).
    controller('LoginController', function($scope, $routeParams) {
        $scope.name = "LoginController";
        $scope.params = $routeParams;
    }).
