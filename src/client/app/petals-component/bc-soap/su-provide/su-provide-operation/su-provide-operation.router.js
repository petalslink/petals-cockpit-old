(function () {
    'use strict';

    var operationSuProvide = angular.module('app.operationSuProvide');

    operationSuProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.su-provide.operation', {
                url: '/operation',
                views: {
                    'petals-console': {
                        controller: 'OperationSuProvideController',
                        templateUrl: './su-provide-operation.html'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE.OPERATION');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE.OPERATION');
                }]

            });

    }
})();
