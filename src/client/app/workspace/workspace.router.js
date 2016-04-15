(function () {
    'use strict';

    var workspace = angular.module('app.workspace');

    workspace.config(configFunction);

    configFunction.$inject = ['$stateProvider', '$urlRouterProvider'];
    /* @ngInject */
    function configFunction($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .when('/workspace', '/workspace/petals');

        $stateProvider
            .state('home.workspace', {
                url: 'workspace',
                sticky: true,
                dsr: true,
                views: {
                    '': {
                        templateUrl: 'src/client/app/workspace/workspace.html',
                        controller: 'WorkspaceController',
                        controllerAs: 'vmWkspce'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE');
                }]
            });
    }
})();
