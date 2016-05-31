(function () {
    'use strict';

    var operationSuProvide = angular.module('petalsComponent.bc-soap.su-provide.operation');

    operationSuProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap-su-provide.su-operation', {
                url: '/operation',
                views: {
                    'petals-console': {
                        controller: 'OperationSuProvideController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/su-provide/operation/operation.html'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You enter in WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE.OPERATION');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE.OPERATION');
                }]

            });

    }
})();
