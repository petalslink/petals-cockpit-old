(function () {
    'use strict';

    var overviewBus = angular.module('app.overviewBus');

    var runFuntion = runFunction;

    overviewBus.config(configFunction);
    overviewBus.run(runFuntion);

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
            .state('workspace.petals.bus.overview', {
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
