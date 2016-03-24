(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',
        'app.layout',
        'app.workspace',

        // Features Workspace

        'app.petals',
        'app.service',
        'app.api'


        // Features Components

/*        'app.configBus',
        'app.configServer',

        'app.nav-consoleBus',
        'app.nav-consoleServer',

        'app.operationServer',

        'app.overviewBus',
        'app.overviewServer'*/

    ]);
})();
