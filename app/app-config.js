(function () {
    'use strict';

    angular
        .module('app', [])
        .config('appConfig');

    function appConfig($urlRouterProvider, $locationProvider) {

        // Add hashbang prefix for SEO and HTML5 mode to remove #! from the URL.
        // Html5 mode requires server-side configuration. See http://bit.ly/1qLuJ0v
        $locationProvider.html5Mode(true).hashPrefix('!');
        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/');

    }

})();

appConfig.$inject = ['$urlRouterProvider', '$locationProvider'];

