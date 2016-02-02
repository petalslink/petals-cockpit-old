'use strict';
// Home View
module.exports = angular.module('frontend-desktop.home',
    [
        require('./sidenav').name
    ])
    .config(require('./homeRoutes'))
    .directive('homeView', require('./homeDirective'))
    .controller('HomeCtrl', require('./HomeController'));