(function () {
    'use strict';

    var configBus = angular.module('petalsComponent.bus.config');

    configBus.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bus.config', {
                url: '/config',
                views: {
                    'petals-console': {
                        templateUrl: 'src/client/app/petals-component/bus/config/config.html',
                        controller: 'ConfigBusController',
                        controllerAs: 'vmBusConfig'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You enter in WORKSPACE.PETALS.BUS.CONFIG');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.BUS.CONFIG');
                }]
            });

    }
})();
