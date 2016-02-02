'use strict';
// Petals View
module.exports = angular.module('frontend-desktop.home.sidenav.petals-view', [])
    .directive('petalsView', require('./petalsDirective'))
    .controller('PetalsCtrl', require('./PetalsController'))
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('petals-theme', 'default')
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
