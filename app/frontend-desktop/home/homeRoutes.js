'use strict';

function homeRoutes($stateProvider) {

    var home = {
        name: 'home',
        abstract: true,  // This makes it so that the url for this route doesn't actually resolve
        url: '/',
        template: '<div home-view></div>', // This injects a new ui-view that the about page directive is injected into
        controller: 'HomeCtrl'
    };

    $stateProvider.state(home);

}

homeRoutes.$inject = ['$stateProvider'];
module.exports = homeRoutes;