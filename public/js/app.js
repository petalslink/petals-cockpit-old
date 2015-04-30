'use strict';

// Declare app level module which depends on filters, and services

angular.module('cockpit-app', [
    'ngRoute',
    'ngAnimate',
    'cockpit-app.controllers',
    'cockpit-app.filters',
    'cockpit-app.services',
    'cockpit-app.directives'
]).
config(function ($routeProvider, $locationProvider) {
    /* First Route */    
    $routeProvider.
    when('/view1', {
        templateUrl: 'partials/partial1',
        controller: 'TestCtrl1'
    }).
    when('/view2', {
        templateUrl: 'partials/partial2',
        controller: 'TestCtrl2'
    }).
    otherwise({
        redirectTo: '/'
    }),
    
    $routeProvider.
    when('/about', {
        templateUrl: '/views/partials/about',
        controller: 'AboutController'
    }),
    
    $routeProvider.
    when('/guide', {
        templateUrl: '/views/partials/guide',
        controller: 'GuideController'
    }),
    
    $routeProvider.
    when('/contact', {
        templateUrl: '/views/partials/contact',
        controller: 'ContactController'
    }),
    $routeProvider.
    otherwise({
        redirectTo: '/',
        controller: 'MainController'
    });,
    
    $locationProvider.html5Mode(true);
});
