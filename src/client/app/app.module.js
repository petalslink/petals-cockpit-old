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
        'app.bc-mail',
        'app.se-quartz',
        'app.se-pojo',

        'app.configBus',
        'app.configServer',
        'app.configBcSoap',
        'app.configBcRest',
        'app.configBcMail',
        'app.configSeQuartz',
        'app.configSePojo',
        'app.configSu',

        'app.nav-consoleSu',

        'app.operationServer',
        'app.operationBcSoap',
        'app.operationBcRest',
        'app.operationBcMail',
        'app.operationSeQuartz',
        'app.operationSePojo',

        'app.overviewBus',
        'app.overviewServer',
        'app.overviewBcSoap',
        'app.overviewBcRest',
        'app.overviewBcMail',
        'app.overviewSeQuartz',
        'app.overviewSePojo',
        'app.overviewSu'

    ]);
})();
