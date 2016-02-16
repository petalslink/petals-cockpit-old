(function () {
    'use strict';

    angular
        .module('app')
        .config('sidenavRoutes', sidenavRoutes);

    sidenavRoutes.$inject = ['$stateProvider'];

    function sidenavRoutes($stateProvider) {

        var sidenav = {
            name: 'sidenav',
            abstract: true,
            url: '/sidenav',
            template: '<sidenav-view></sidenav-view>',
            controller: 'SidenavController'
        };
        $stateProvider.state(sidenav);

    }

})();