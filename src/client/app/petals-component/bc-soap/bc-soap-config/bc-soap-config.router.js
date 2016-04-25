(function () {
    'use strict';

    var configBcSoap = angular.module('petalsComponent.configBcSoap');

    configBcSoap.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.config', {
                url: '/config',
                views: {
                    'petals-console': {
                        templateUrl: 'src/client/app/petals-component/bc-soap/bc-soap-config/bc-soap-config.html',
                        controller: 'ConfigBcSoapController',
                        controllerAs: 'vmBcSoapConfig'
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
