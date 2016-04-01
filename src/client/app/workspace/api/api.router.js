(function () {
    'use strict';

    var api = angular.module('app.api');

    var runFuntion = runFunction;

    api.config(configFunction);
    api.run(runFuntion);

    runFunction.$inject = ['$rootScope', '$state', '$stateParams'];

    /* @ngInject */
    function runFunction($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    configFunction.$inject = ['$locationProvider', '$stickyStateProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stickyStateProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider
            .otherwise('/workspace');

        $stateProvider
            .state('workspace.api', {
                url: '/api',
                sticky: true,
                dsr: true,
                views: {
                    'api-sidenav': {
                        templateUrl: 'src/client/app/workspace/api/api.html',
                        controller: 'ApiController',
                        onEnter: function () {
                            console.log("You are in API");
                        }
                    },
                    'api-nav-console': {
                        template: '<h1>THIS IS NAV API</h1>',
                        controller: '',
                        onEnter: function () {
                            console.log("You are in NAV");
                        }
                    },
                    'api-console': {
                        template: '<h1>THIS IS CONSOLE API</h1>',
                        controller: '',
                        onEnter: function () {
                            console.log("You are in CONSOLE");
                        }
                    }
                }
            });

        $stickyStateProvider.enableDebug(true);
    }
})();