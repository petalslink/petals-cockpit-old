'use strict';

function homeRoutes($stateProvider) {

    var home = {
        name: 'home', // state name
        url: '/', // url path that activates this state
        template: '<div home-view></div>', // generate the Directive "homeView" - when calling the directive in HTML, the name must not be camelCased
        data: {
            moduleClasses: 'page', // assign a module class to the <body> tag
            pageClasses: 'home', // assign a page-specific class to the <body> tag
            pageTitle: 'Home', // set the title in the <head> section of the index.html file
            pageDescription: 'Meta Description goes here' // meta description in <head>
        }
    };
/*
    var sidenav = {
        name: 'sidenav',
        url: '^/sidenav', // The ^ character makes this url override the parent url
        template: '<div sidenav-view></div>',
        data: {
            moduleClasses: 'page',
            pageClasses: 'sidenav',
            pageTitle: 'Sidenav',
            pageDescription: 'Some description.'
        }
    };*/

    $stateProvider.state(home);
/*    $stateProvider.state(sidenav);*/

}

homeRoutes.$inject = ['$stateProvider'];
module.exports = homeRoutes;