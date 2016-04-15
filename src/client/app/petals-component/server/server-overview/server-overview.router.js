(function () {
    'use strict';

    var overviewServer = angular.module('app.overviewServer');

    overviewServer.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.server.overview', {
                url: '/overview',
                views: {
                    'petals-console': {
                        controller: 'OverviewServerController',
                        templateUrl: 'src/client/app/petals-component/server/server-overview/server-overview.html'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER.OVERVIEW');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER.OVERVIEW');
                }]
            });

    }
})();
