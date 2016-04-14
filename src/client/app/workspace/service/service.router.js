(function () {
    'use strict';

    var service = angular.module('app.service');

    var runFuntion = runFunction;

    service.config(configFunction);
    service.run(runFuntion);

    runFunction.$inject = ['$rootScope', '$state', '$stateParams'];

    /* @ngInject */
    function runFunction($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider
            .otherwise('/workspace');

        $stateProvider
            .state('workspace.service', {
                url: '/service',
                sticky: true,
                dsr: true,
                views: {
                    'service-sidenav': {
                        templateUrl: 'src/client/app/workspace/service/service.html',
                        controller: 'ServiceController'
                    },
                    'service-nav-console': {
                        template: '<h1>THIS IS NAV SERVICE</h1>',
                        controller: ''
                    },
                    'service-console': {
                        template: '<h1>THIS IS CONSOLE SERVICE</h1>',
                        controller: ''
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.SERVICE');
                }],
                onReactivate: ['dataWkspceService', 'logger', function (dataWkspceService, logger) {
                    logger.debug('You are in WORKSPACE.SERVICE');
                    dataWkspceService.resetStateInfoSelect('SERVICE');
                }],
                onInactivate: ['dataWkspceService', function (dataWkspceService) {
                    dataWkspceService.storeStateInfoSelect('SERVICE');

                }]
            });
    }

})();
