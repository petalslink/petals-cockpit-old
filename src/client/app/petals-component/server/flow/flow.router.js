(function () {
    'use strict';

    var flowServer = angular.module('petalsComponent.server.flow');

    flowServer.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.server.flow', {
                url: '/flow',
                views: {
                    'petals-console': {
                        templateUrl: 'src/client/app/petals-component/server/flow/flow.html',
                        controller: 'FlowServerController',
                        controllerAs: 'vmServerFlow'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER.FLOW');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.SERVER.FLOW');
                }]
            });
    }
})();
