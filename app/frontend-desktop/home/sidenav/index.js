'use strict';
// Sidenav View
module.exports = angular.module('frontend-desktop.home.sidenav',
    [
        require('./petals-view').name
    ])
    .config(require('./sidenavRoutes'))
    .directive('sidenavView', require('./sidenavDirective'))
    .controller('SidenavCtrl', require('./SidenavController'))
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('sidenav-theme', 'default')
            .primaryPalette('orange', {
                'default': '800',
                'hue-1': '800',
                'hue-2': '300',
                'hue-3': '100'
            })
            .accentPalette('deep-purple', {
                'default': '800',
                'hue-1': '800',
                'hue-2': '300',
                'hue-3': '200'
            });
    });
