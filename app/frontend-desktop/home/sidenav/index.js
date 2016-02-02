'use strict';
// Sidenav View
module.exports = angular.module('frontend-desktop.home.sidenav',
    [
        require('./petals-view').name
    ])
    .config(require('./sidenavRoutes'))
    .directive('sidenavView', require('./sidenavDirective'))
    .controller('SidenavCtrl', require('./SidenavController'));
