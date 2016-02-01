'use strict';

module.exports = angular.module('common.elements.commonHeader', [])
    .directive('commonHeader', function() {
        return {
            template: require('./common-header.html'),
            restrict: 'EA',
            replace: true
        };
    })
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('header-theme', 'default')
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