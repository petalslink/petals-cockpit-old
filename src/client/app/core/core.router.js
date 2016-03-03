(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(configFunction);
    core.run(runFuntion);

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
            .otherwise('/');

        $stateProvider
/*            .state('tabs', {
                abstract: true,
                url: '/tabs',
                templateUrl: 'src/client/app/petals/console/nav-console/nav-console.html',
                onEnter: function () {
                    console.log("You are in NAV CONSOLE");
                }
            })*/

            // Route Console Tabs
            .state('overview', {
                url: '/overview',
                onEnter: function () {
                    console.log("You are in OVERVIEW");
                },
                templateUrl: 'src/client/app/petals/console/overview/overview.html'
            })
            .state('operation', {
                url: '/operation',
                onEnter: function () {
                    console.log("You are in OPERATION");
                },
                templateUrl: 'src/client/app/petals/console/operation/operation.html'
            })
            .state('monitor', {
                url: '/monitor',
                onEnter: function () {
                    console.log("You are in MONITOR");
                },
                templateUrl: 'src/client/app/petals/console/monitor/monitor.html'
            })
            .state('config', {
                url: '/config',
                onEnter: function () {
                    console.log("You are in CONFIG");
                },
                templateUrl: 'src/client/app/petals/console/config/config.html'
            })
            .state('flow', {
                url: '/flow',
                onEnter: function () {
                    console.log("You are in FLOW");
                },
                templateUrl: 'src/client/app/petals/console/flow/flow.html'
            })
            .state('log', {
                url: '/log',
                onEnter: function () {
                    console.log("You are in LOG");
                },
                templateUrl: 'src/client/app/petals/console/log/log.html'
            })
            .state('user', {
                url: '/user',
                onEnter: function () {
                    console.log("You are in USER");
                },
                templateUrl: 'src/client/app/petals/console/user/user.html'
            });
    }
})();
