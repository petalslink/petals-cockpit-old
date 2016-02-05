'use strict';

function sidenavRoutes($stateProvider) {

    var sidenav = {
        name: 'sidenav',
        abstract: true,
        url: '/sidenav',
        template: '<sidenav-view></sidenav-view>',
        controller: 'SidenavCtrl'
    };
    $stateProvider.state(sidenav);

}

sidenavRoutes.$inject = ['$stateProvider'];
module.exports = sidenavRoutes;