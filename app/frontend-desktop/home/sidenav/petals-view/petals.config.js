(function () {
    'use strict';

    angular
        .module('frontend-desktop.home.sidenav.petals-view', [])
        .config('petalsConfig');

    function petalsConfig($mdThemingProvider) {

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
    }

})();

petalsConfig.$inject = ['$mdThemingProvider'];