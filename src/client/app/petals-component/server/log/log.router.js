(function () {
    'use strict';

    var logServer = angular.module('petalsComponent.server.log');

    logServer.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.server.log', {
                url: '/log',
                views: {
                    'petals-console': {
                        templateUrl: 'src/client/app/petals-component/server/log/log.html',
                        controller: 'LogServerController',
                        controllerAs: 'vmServerLog'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER.LOG');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.SERVER.LOG');
                }]
            });
    }
})();
