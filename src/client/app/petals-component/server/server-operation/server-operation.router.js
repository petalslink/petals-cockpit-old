(function () {
    'use strict';

    var operationServer = angular.module('app.operationServer');

    operationServer.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.server.operation', {
                url: '/operation',
                views: {
                    'petals-console': {
                        templateUrl: 'src/client/app/petals-component/server/server-operation/server-operation.html',
                        controller: 'OperationServerController',
                        controllerAs: 'vmServerOperation'
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
