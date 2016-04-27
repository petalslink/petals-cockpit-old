(function () {
    'use strict';

    var operationSuProvide = angular.module('petalsComponent.bc-soap.su-consume.operation');

    operationSuProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap-su-consume.operation', {
                url: '/operation',
                views: {
                    'petals-console': {
                        controller: 'OperationSuConsumeController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/su-provide/operation/operation.html'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-CONSUME.OPERATION');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-CONSUME.OPERATION');
                }]

            });

    }
})();
