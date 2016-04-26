(function () {
    'use strict';

    var overviewBus = angular.module('petalsComponent.bus.overview');

    overviewBus.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bus.overview', {
                url: '/overview',
                views: {
                    'petals-console': {
                        templateUrl: 'src/client/app/petals-component/bus/overview/overview.html',
                        controller: 'OverviewBusController',
                        controllerAs: 'vmBusOverview'
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
