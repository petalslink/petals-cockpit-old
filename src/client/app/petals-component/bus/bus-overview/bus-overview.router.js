(function () {
    'use strict';

    var overviewBus = angular.module('app.overviewBus');

    overviewBus.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bus.overview', {
                url: '/overview',
                views: {
                    'petals-console': {
                        controller: 'OverviewBusController',
                        templateUrl: 'src/client/app/petals-component/bus/bus-overview/bus-overview.html'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BUS.OVERVIEW');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BUS.OVERVIEW');
                }]
            });

    }
})();
