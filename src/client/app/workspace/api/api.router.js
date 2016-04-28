(function () {
    'use strict';

    var api = angular.module('app.api');

    api.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.api', {
                url: '/api',
                sticky: true,
                dsr: true,
                views: {
                    'api-sidenav': {
                        templateUrl: 'src/client/app/workspace/api/api.html',
                        controller: 'ApiController'
                    },
                    'api-nav-console': {
                        template: '<h1>THIS IS NAV API</h1>',
                        controller: ''
                    },
                    'api-console': {
                        template: '<h1>THIS IS CONSOLE API</h1>',
                        controller: ''
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You enter in WORKSPACE.API');
                }],
                onReactivate: ['dataWkspceService', 'logger', function (dataWkspceService, logger) {
                    logger.debug('You reactivate WORKSPACE.API');
                    dataWkspceService.resetStateInfoSelect('API');
                }],
                onInactivate: ['dataWkspceService', function (dataWkspceService) {
                    dataWkspceService.storeStateInfoSelect('API');

                }]
            });

    }
})();
