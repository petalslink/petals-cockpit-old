(function () {
    'use strict';

    angular
        .module('frontend-desktop.home.sidenav', [])
        .config('sidenavConfig', sidenavConfig);

    sidenavConfig.$inject = ['$mdThemingProvider'];

    function sidenavConfig($mdThemingProvider) {

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
    }

})();