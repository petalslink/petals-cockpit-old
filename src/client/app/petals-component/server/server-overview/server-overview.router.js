(function () {
    'use strict';

    var overviewServer = angular.module('app.overviewServer');

    var runFuntion = runFunction;

    overviewServer.config(configFunction);
    overviewServer.run(runFuntion);

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
            .state('workspace.petals.server.overview', {
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
