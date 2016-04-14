(function () {
    'use strict';

    var configServer = angular.module('app.configServer');

    var runFuntion = runFunction;

    configServer.config(configFunction);
    configServer.run(runFuntion);

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
            .state('workspace.petals.server.config', {
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
