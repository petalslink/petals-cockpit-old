(function () {
    'use strict';

    var operationSuProvide = angular.module('petalsComponent.bc-soap.su-consume.operation');

    operationSuProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap-su-consume.su-operation', {
                url: '/operation',
                views: {
                    'petals-console': {
                        controller: 'OperationBcSoapSuConsumeController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/su-consume/operation/operation.html',
                        controllerAs: 'vmBcSoapSuConsumeOperation'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You enter in WORKSPACE.PETALS.BC-SOAP.SU-CONSUME.OPERATION');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.BC-SOAP.SU-CONSUME.OPERATION');
                }]

            });

    }
})();
