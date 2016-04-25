(function () {
    'use strict';

    var operationBcSoap = angular.module('petalsComponent.bc-soap.operation');

    operationBcSoap.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.operation', {
                url: '/operation',
                views: {
                    'petals-console': {
                        templateUrl: 'src/client/app/petals-component/bc-soap/operation/operation.html',
                        controller: 'OperationBcSoapController',
                        controllerAs: 'vmBcSoapOperation'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.OPERATION');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.OPERATION');
                }]

            });

    }
})();
