(function () {
    'use strict';

    var operationBcSoap = angular.module('app.operationBcSoap');

    var runFuntion = runFunction;

    operationBcSoap.config(configFunction);
    operationBcSoap.run(runFuntion);

    runFunction.$inject = ['$rootScope', '$state', '$stateParams'];

    /* @ngInject */
    function runFunction($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    configFunction.$inject = ['$locationProvider', '$stateProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('workspace.petals.bc-soap.operation', {
                url: '/operation',
                sticky: true,
                dsr: true,
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
