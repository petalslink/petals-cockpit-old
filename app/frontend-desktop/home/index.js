'use strict';
// Home View
module.exports = angular.module('frontend-desktop.home', [])
    .directive('homeView', require('./homeDirective'))
    .controller('HomeCtrl', require('./HomeController'))
    .config(require('./homeRoutes'));