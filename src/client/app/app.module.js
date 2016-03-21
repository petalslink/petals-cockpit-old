(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',
        'app.appbar',
        'app.login',
        'app.workspace',

        // Features Petals

        'app.console',
        'app.menu',
        'app.petals',
        'app.sidenav',

        // Features Components

        'app.configBus',
        'app.configServer',

        'app.nav-consoleBus',
        'app.nav-consoleServer',

        'app.operationServer',

        'app.overviewBus',
        'app.overviewServer'


    ]);
})();
