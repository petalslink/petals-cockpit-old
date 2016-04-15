(function () {
    'use strict';

    var configBus = angular.module('app.configBus');

    configBus.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bus.config', {
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
