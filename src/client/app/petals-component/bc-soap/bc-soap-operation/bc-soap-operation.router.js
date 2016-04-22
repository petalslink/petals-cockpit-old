(function () {
    'use strict';

    var operationBcSoap = angular.module('app.operationBcSoap');

    operationBcSoap.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.operation', {
                url: '/operation',
                views: {
                    'petals-console': {
                        controller: 'OperationBcSoapController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/bc-soap-operation/bc-soap-operation.html'
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
