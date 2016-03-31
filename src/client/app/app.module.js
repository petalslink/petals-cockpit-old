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

        'app.configBus',
        'app.configServer',
        'app.configBcSoap',
        'app.configSu',

        'app.nav-consoleSu',

        'app.operationServer',
        'app.operationBcSoap',

        'app.overviewBus',
        'app.overviewServer',
        'app.overviewBcSoap',
        'app.overviewSu'

    ]);
})();
