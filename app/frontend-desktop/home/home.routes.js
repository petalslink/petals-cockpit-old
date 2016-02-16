(function () {
    'use strict';

    angular
        .module('frontend-desktop.home', [])
        .config('homeRoutes', homeRoutes);

    homeRoutes.$inject = ['$stateProvider'];

    function homeRoutes($stateProvider) {

        var home = {
            name: 'home',
            url: '/',
            template: '<home-view></home-view>',
            controller: 'HomeController',
            data: {
                moduleClasses: 'page',
                pageClasses: 'home',
                pageTitle: 'Home',
                pageDescription: 'This is the Home Page'
            }
        };

        $stateProvider.state(home);

    }

})();