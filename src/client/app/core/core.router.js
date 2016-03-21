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
        $rootScope.$on('$stateChangeStart', function(evt, to, params) {
            if (to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params)
            }
        });
    }

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('core', {
                url: '',
                views: {
                    'workspaceView': {
                        templateUrl: 'src/client/app/components/workspace/workspace.html',
                        onEnter: function () {
                            console.log("You are in WORKSPACE");
                        }
                        /*redirectTo: 'core.workspace'*/
                    }
                }
            });

/*        $stateProvider
            .state('nav', {
                abstract: true,
                url: '/nav',
                templateUrl: 'src/client/app/components/console/nav-console/nav-console.html',
                onEnter: function () {
                    console.log("You are in NAV CONSOLE");
                }
            })
            .state('overview.bus', {
                url: '/overview',
                onEnter: function () {
                    console.log("You are in OVERVIEW");
                },
                templateUrl: 'src/client/app/petals/bus/overview/overview.html'
            })
            .state('config.bus', {
                url: '/config',
                onEnter: function () {
                    console.log("You are in CONFIG");
                },
                templateUrl: 'src/client/app/petals/server/config/config.html'
            });*/

/*            .state('tabs', {
                abstract: true,
                url: '/tabs',
                templateUrl: 'src/client/app/petals/console/nav-console/nav-console.html',
                onEnter: function () {
                    console.log("You are in NAV CONSOLE");
                }
            })*/

            // Route Console Tabs
/*            .state('overview.bus', {
                url: '/overview',
                onEnter: function () {
                    console.log("You are in OVERVIEW");
                },
                templateUrl: 'src/client/app/petals/bus/overview/overview.html'
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
            .state('config.bus', {
                url: '/config',
                onEnter: function () {
                    console.log("You are in CONFIG");
                },
                templateUrl: 'src/client/app/petals/server/config/config.html'
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
            });*/
    }
})();
