(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',
        'app.petals',

        // Features (listed alphabetically)
        'app.appbar',
        'app.apptabs',
        'app.configBus',
        'app.configServer',
        'app.console',
        'app.dashboard',
        'app.flow',
        'app.log',
        'app.login',
        'app.monitor',
        'app.nav-consoleBus',
        'app.operation',
        'app.overviewBus',
        'app.overviewServer',
        'app.sidenav',
        'app.user',
        'app.workspace'

    ]);
})();
