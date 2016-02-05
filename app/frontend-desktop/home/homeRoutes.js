'use strict';

function homeRoutes($stateProvider) {

    var home = {
        name: 'home', // This makes it so that the url for this route doesn't actually resolve
        url: '/',
        template: '<home-view></home-view>', // This injects a new ui-view that the about page directive is injected into
        controller: 'HomeCtrl',
        data: {
        moduleClasses: 'page',
            pageClasses: 'home',
            pageTitle: 'Home',
            pageDescription: 'This is the Home Page'
        }
    };

    $stateProvider.state(home);

}

homeRoutes.$inject = ['$stateProvider'];
module.exports = homeRoutes;