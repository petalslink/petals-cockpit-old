(function () {
    'use strict';

    var configBus = angular.module('app.configBus');

    var runFuntion = runFunction;

    configBus.config(configFunction);
    configBus.run(runFuntion);

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
            .state('workspace.petals.bus.config', {
                url: '/config',
                views: {
                    'petals-console': {
                        controller: 'ConfigBusController',
                        templateUrl: 'src/client/app/petals-component/bus/bus-config/bus-config.html'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BUS.CONFIG');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BUS.CONFIG');
                }]
            });

    }
})();
