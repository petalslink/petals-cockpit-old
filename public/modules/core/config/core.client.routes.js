'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        // Home state routing
        $stateProvider.
            state('home', {
                url: '/',
                templateUrl: 'modules/core/views/home.client.view.html'
            });
    }
]);

/*
angular.module('core').config(['$stateProvider', '$urlRouterProvider',

    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    '@': {
                        templateUrl: 'modules/core/views/home.client.view.html',
                        controller: 'HomeController as vm'
                    }
                }
            })
            .state('home.beers', {
                url: 'beers',
                abstract: true
            })
            .state('home.beers.ipas', {
                url: '/ipas',
                views: {
                    'content@home': {
                        templateUrl: 'modules/core/views/beers.ipa.view.html'
                    }
                }
            })
            .state('home.beers.porters', {
                url: '/porters',
                views: {
                    'content@home': {
                        templateUrl: 'modules/core/views/beers.porters.view.html'
                    }
                }
            })
            .state('home.beers.wheat', {
                url: '/porters',
                views: {
                    'content@home': {
                        templateUrl: 'modules/core/views/beers.wheat.view.html'
                    }
                }
            })
    }]);*/
