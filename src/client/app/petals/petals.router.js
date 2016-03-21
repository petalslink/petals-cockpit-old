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

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider
            .otherwise('/workspace');

        $stateProvider
            .state('core.workspace.petals', {
                url: '/petals',
                /*abstract: true,*/
                views: {
                    'petalsView': {
                        templateUrl: 'src/client/app/petals/petals.html',
                        directive: 'tmplTree',
/*                        link : function (scope, elem, attrs) {
                            scope.isActiveState = function () {

                                if ($scope.selected[0] = true ) {
                                    return $state.go('core.workspace.petals.bus')
                                }
                                if ($scope.selected[1] = true ) {
                                    $state.go('core.workspace.petals.server')
                                }
                                return $state.includes(name);
                            };
                        },*/
                        controller: 'PetalsController',
                        onEnter: function () {
                            console.log("You are in PETALS");
                        }
                        /* OTHERS VIEWS COMING (SERVICE & API) */
                    }
/*                     'busNavConsoleView': {
                     controller: 'NavConsoleBusController',
                     templateUrl: 'src/client/app/petals/bus/bus-nav-console/bus-nav-console.html',
                     onEnter: function () {
                     console.log("You are in NAV CONSOLE");
                     }
                     },
                    'serverNavConsoleView': {
                        controller: 'NavConsoleServerController',
                        templateUrl: 'src/client/app/petals/server/server-nav-console/server-nav-console.html',
                        onEnter: function () {
                            console.log("You are in NAV CONSOLE");
                        }
                    }*/
/*                    'busOverviewView': {
                        template: '<div ui-view="busOverviewView"></div>'
                    },
                    'busConfigView': {
                        template: '<div ui-view="busConfigView"></div>'
                    },
                    'serverOverviewView': {
                        template: '<div ui-view="serverOverviewView"></div>'
                    },
                    'serverOperationView': {
                        template: '<div ui-view="serverOperationView"></div>'
                    },
                    'serverConfigView': {
                        template: '<div ui-view="serverConfigView"></div>'
                    }*//*
                    'busOverviewView': {
                     controller: 'OverviewBusController',
                     templateUrl: 'src/client/app/petals/bus/overview/overview.html',
                     onEnter: function () {
                     console.log("You are in BUS OVERVIEW");
                     }
                     },
                     'busConfigView': {
                     controller: 'ConfigBusController',
                     templateUrl: 'src/client/app/petals/bus/config/config.html',
                     onEnter: function () {
                     console.log("You are in BUS CONFIG");
                     }
                     }*/
                }
            })
            .state('core.workspace.petals.bus', {
                url: '/bus',
                'busNavConsoleView': {
                    controller: 'NavConsoleBusController',
                    templateUrl: 'src/client/app/petals/bus/bus-nav-console/bus-nav-console.html',
                    onEnter: function () {
                        console.log("You are in NAV CONSOLE");
                    }
                }
            })
            .state('core.workspace.petals.server', {
                url: '/server',
                'serverNavConsoleView': {
                    controller: 'NavConsoleServerController',
                    templateUrl: 'src/client/app/petals/server/server-nav-console/server-nav-console.html',
                    onEnter: function () {
                        console.log("You are in NAV CONSOLE SERVER");
                    }
                }
            })
    }
})();
