(function () {
    'use strict';

    var overviewServer = angular.module('petalsComponent.server.overview');

    overviewServer.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.server.overview', {
                url: '/overview',
                views: {
                    'petals-console': {
                        templateUrl: 'src/client/app/petals-component/server/overview/overview.html',
                        controller: 'OverviewServerController',
                        controllerAs: 'vmServerOverview'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER.OVERVIEW');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.SERVER.OVERVIEW');
                }]
            });

    }
})();
