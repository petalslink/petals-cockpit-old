(function () {
    'use strict';

    var petals = angular.module('app.petals');

    var runFuntion = runFunction;

    petals.config(configFunction);
    petals.run(runFuntion);

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
        /*
         * **** SEE THE VIEW PETALS TREE WHEN BUTTON PETALS IS SELECTED
         * */
            .state('core.workspace.petals', {
                url: '/petals',
                views: {
                    'petals': {
                        templateUrl: 'src/client/app/petals/petals.html',
                        directive: 'tmplTree',
                        controller: 'PetalsController',
                        sticky: true,
                        dsr: true,
                        onEnter: function () {
                            console.log("You are in PETALS");
                        }
                    }
                }
            })
            /*
             * **** SEE THE VIEW NAV CONSOLE WHEN BUS IS SELECTED
             * */
            .state('core.workspace.petals.bus', {
                url: '/bus',
                views: {
                    'petals@busNavConsole': {
                        controller: 'NavConsoleBusController',
                        templateUrl: 'src/client/app/petals/bus/bus-nav-console/bus-nav-console.html',
                        onEnter: function () {
                            console.log("You are in NAV CONSOLE BUS");
                        }
                    }
                }
            })
            /*
             * **** SEE THE VIEW CONTENT BUTTONS OF THE BUS NAV CONSOLE WHEN BUTTON IS SELECTED
             * */
            .state('core.workspace.petals.bus.overview', {
                url: '/overview',
                views: {
                    'busNavConsole@busOverview': {
                        controller: 'OverviewBusController',
                        templateUrl: 'src/client/app/petals/bus/bus-overview/bus-overview.html',
                        onEnter: function () {
                            console.log("You are in BUS OVERVIEW");
                        }
                    }
                }
            })
            .state('core.workspace.petals.bus.config', {
                url: '/config',
                views: {
                    'busNavConsole@busConfig': {
                        controller: 'ConfigBusController',
                        templateUrl: 'src/client/app/petals/bus/bus-config/bus-config.html',
                        onEnter: function () {
                            console.log("You are in BUS CONFIG");
                        }
                    }
                }
            })
            /*
             * **** SEE THE VIEW NAV CONSOLE WHEN SERVER IS SELECTED
             * */
            .state('core.workspace.petals.server', {
                url: '/server',
                views: {
                    'petals@serverNavConsole': {
                        controller: 'NavConsoleServerController',
                        templateUrl: 'src/client/app/petals/server/server-nav-console/server-nav-console.html',
                        onEnter: function () {
                            console.log("You are in NAV CONSOLE SERVER");
                        }
                    }
                }
            })
            /*
             * **** SEE THE VIEW CONTENT BUTTONS OF THE SERVER NAV CONSOLE WHEN BUTTON IS SELECTED
             * */
            .state('core.workspace.petals.server.overview', {
                url: '/overview',
                views: {
                    'serverNavConsole@serverOverview': {
                        controller: 'OverviewServerController',
                        templateUrl: 'src/client/app/petals/server/server-overview/server-overview.html',
                        onEnter: function () {
                            console.log("You are in SERVER OVERVIEW");
                        }
                    }
                }
            })
            .state('core.workspace.petals.server.operation', {
                url: '/operation',
                views: {
                    'serverNavConsole@serverOperation': {
                        controller: 'OperationServerController',
                        templateUrl: 'src/client/app/petals/server/server-operation/server-operation.html',
                        onEnter: function () {
                            console.log("You are in SERVER OPERATION");
                        }
                    }
                }
            })
            .state('core.workspace.petals.server.config', {
                url: '/config',
                views: {
                    'serverNavConsole@serverConfig': {
                        controller: 'ConfigServerController',
                        templateUrl: 'src/client/app/petals/server/server-config/server-config.html',
                        onEnter: function () {
                            console.log("You are in SERVER CONFIG");
                        }
                    }
                }
            });

        $stickyStateProvider.enableDebug(true);
    }
})();
