(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',
        'app.petals',

        // Features (listed alphabetically)
        'app.accounts',
        'app.appbar',
        'app.approot',
        'app.apptabs',
        'app.dashboard',
        'app.login',
        'app.sidenav'

    ]);
})();
