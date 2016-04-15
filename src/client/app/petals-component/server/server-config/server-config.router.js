(function () {
    'use strict';

    var configServer = angular.module('app.configServer');

    configServer.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.server.config', {
                url: '/config',
                views: {
                    'petals-console': {
                        controller: 'ConfigServerController',
                        templateUrl: 'src/client/app/petals-component/server/server-config/server-config.html'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER.CONFIG');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER.CONFIG');
                }]
            });

    }
})();
