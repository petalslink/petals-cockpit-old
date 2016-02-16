(function () {
    'use strict';

    angular.module('common.elements.commonHeader', [])
        .config('commonHeaderConfig', commonHeaderConfig);

    commonHeaderConfig.$inject = ['$mdThemingProvider'];

    function commonHeaderConfig($mdThemingProvider) {
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
    }

})();