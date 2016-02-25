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
        'app.config',
        'app.console',
        'app.dashboard',
        'app.flow',
        'app.log',
        'app.login',
        'app.monitor',
        'app.nav-console',
        'app.operation',
        'app.overview',
        'app.sidenav',
        'app.user'

    ]);
})();
