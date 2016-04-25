(function () {
    'use strict';

    var operationBcSoap = angular.module('petalsComponent.operationBcSoap');

    operationBcSoap.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.operation', {
                url: '/operation',
                views: {
                    'petals-console': {
                        templateUrl: 'src/client/app/petals-component/bc-soap/bc-soap-operation/bc-soap-operation.html',
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
