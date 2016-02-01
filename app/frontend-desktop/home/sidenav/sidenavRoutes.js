'use strict';

function sidenavRoutes($stateProvider) {

    var sidenav = {
        name: 'sidenav',
        abstract: true,  // This makes it so that the url for this route doesn't actually resolve
        url: '/sidenav',
        template: '<div sidenav-view></div>', // This injects a new ui-view that the petals page directive is injected into
        controller: 'SidenavCtrl'
    };

    var petals = {
        name: 'sidenav.petalsView',
        url: '^/petals-view', // The ^ character makes this url override the parent url
        template: '<div petals-view></div>',
        data: {
            moduleClasses: 'page',
            pageClasses: 'petals-view',
            pageTitle: 'Petals',
            pageDescription: 'Some description.'
        }
    };

    $stateProvider.state(sidenav);
    $stateProvider.state(petals);

}

sidenavRoutes.$inject = ['$stateProvider'];
module.exports = sidenavRoutes;