(function () {
    'use strict';

    var monitorServer = angular.module('petalsComponent.server.monitor');

    monitorServer.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.server.monitor', {
                url: '/monitor',
                views: {
                    'petals-console': {
                        templateUrl: 'src/client/app/petals-component/server/monitor/monitor.html',
                        controller: 'MonitorServerController',
                        controllerAs: 'vmServerMonitor'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER.MONITOR');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.SERVER.MONITOR');
                }]
            });
    }
})();
