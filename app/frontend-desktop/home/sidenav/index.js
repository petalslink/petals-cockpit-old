'use strict';
// Sidenav View
module.exports = angular.module('frontend-desktop.home.sidenav', [])
    .config(require('./sidenavRoutes'))
    .controller('SidenavCtrl', require('./SidenavController'))
    .directive('sidenavView', require('./sidenavDirective'));
