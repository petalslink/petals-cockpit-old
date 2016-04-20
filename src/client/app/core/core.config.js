(function () {
    'use strict';

    var core = angular.module('app.core');

    // Application configuration values
    var config = {
        appErrorPrefix: '[Petals Cockpit] ',
        appTitle: 'Petals Cockpit'
    };

    core.value('config', config);

    // Configure the app
    core.config(configFunction);

    configFunction.$inject = [
        '$compileProvider',
        '$logProvider',
        '$mdIconProvider',
        '$mdThemingProvider',
        'exceptionHandlerProvider'
    ];

    /* @ngInject */
    function configFunction(
        $compileProvider,
        $logProvider,
        $mdIconProvider,
        $mdThemingProvider,
        exceptionHandlerProvider) {

        // During development, you may want to set debugInfoEnabled to true. This is required for tools like
        // Protractor, Batarang and ng-inspector to work correctly. However do not check in this change.
        // This flag must be set to false in production for a significant performance boost.
        $compileProvider.debugInfoEnabled(false);

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        exceptionHandlerProvider.configFunction(config.appErrorPrefix);

        $mdIconProvider
            .iconSet('content', 'images/content-icons.svg', 24)
            .iconSet('navigation', 'images/navigation-icons.svg', 24)
            .iconSet('mdicons', 'images/mdi.svg',24);
            //.defaultIconSet('mdicon', 'images/mdi.svg',48);

        $mdThemingProvider.theme('core-theme', 'default')
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

        $mdThemingProvider.theme('menu-theme', 'default')
            .primaryPalette('grey', {
                'default': '100',
                'hue-1': '100',
                'hue-2': '50',
                'hue-3': '50'
            })
            .accentPalette('deep-purple', {
                'default': '800',
                'hue-1': '800',
                'hue-2': '300',
                'hue-3': '200'
            });

        $mdThemingProvider.theme('navConsole-theme', 'default')
            .primaryPalette('deep-purple', {
                'default': '800',
                'hue-1': '800',
                'hue-2': '300',
                'hue-3': '100'
            })
            .accentPalette('grey', {
                'default': '200',
                'hue-1': '800',
                'hue-2': '300',
                'hue-3': '200'
            });

        $mdThemingProvider.theme('navTree-theme', 'default')
            .primaryPalette('deep-purple', {
                'default': '800',
                'hue-1': '800',
                'hue-2': '300',
                'hue-3': '100'
            })
            .accentPalette('orange', {
                'default': '800',
                'hue-1': '800',
                'hue-2': '300',
                'hue-3': '200'
            });

        $mdThemingProvider.theme('iconTree-theme', 'default')
            .primaryPalette('green', {
                'default': '600',
                'hue-1': '800',
                'hue-2': '300',
                'hue-3': '100'
            })
            .accentPalette('red', {
                'default': '600',
                'hue-1': '800',
                'hue-2': '300',
                'hue-3': '200'
            });

        $mdThemingProvider.theme('cardServer-theme', 'default')
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
