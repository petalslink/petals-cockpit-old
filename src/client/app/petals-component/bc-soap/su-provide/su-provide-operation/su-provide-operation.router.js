(function () {
    'use strict';

    var operationSuProvide = angular.module('petalsComponent.bc-soap.su-provide.operation');

    operationSuProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.su-provide.operation', {
                url: '/operation',
                views: {
                    /* jshint ignore:start */
                    'petals-console': {
                        controller: 'OperationSuProvideController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/su-provide/su-provide-operztion/su-provide-operation.html'
                    }
                    /* jshint ignore:end */
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
