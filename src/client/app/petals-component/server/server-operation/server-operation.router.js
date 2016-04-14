(function () {
    'use strict';

    var operationServer = angular.module('app.operationServer');

    var runFuntion = runFunction;

    operationServer.config(configFunction);
    operationServer.run(runFuntion);

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
            .state('workspace.petals.server.operation', {
                url: '/operation',
                views: {
                    'petals-console': {
                        controller: 'OperationServerController',
                        templateUrl: 'src/client/app/petals-component/server/server-operation/server-operation.html'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER.OPERATION');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER.OPERATION');
                }]
            });

    }
})();
