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
        'app.api',


        // Features Components

        'app.bus',
        'app.server',
        'app.bc-soap',
        'app.bc-rest',

        'app.configBus',
        'app.configServer',
        'app.configBcSoap',
        'app.configBcRest',
        'app.configSu',

        'app.nav-consoleSu',

        'app.operationServer',
        'app.operationBcSoap',
        'app.operationBcRest',

        'app.overviewBus',
        'app.overviewServer',
        'app.overviewBcSoap',
        'app.overviewBcRest',
        'app.overviewSu'

    ]);
})();
