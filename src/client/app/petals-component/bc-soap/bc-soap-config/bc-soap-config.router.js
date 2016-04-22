(function () {
    'use strict';

    var configBcSoap = angular.module('app.configBcSoap');

    configBcSoap.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.config', {
                url: '/config',
                views: {
                    'petals-console': {
                        controller: 'ConfigBcSoapController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/bc-soap-config/bc-soap-config.html'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.CONFIG');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.CONFIG');
                }]

            });

    }
})();
