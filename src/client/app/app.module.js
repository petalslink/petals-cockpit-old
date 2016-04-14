(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',
        'app.layout',

        // Features Workspace
        'app.workspace'
    ]);
/* TODO to keep?
    angular.module('app', ['ngMaterial'])
        .config(function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('pink')
                .accentPalette('orange');
        });
*/
})();
