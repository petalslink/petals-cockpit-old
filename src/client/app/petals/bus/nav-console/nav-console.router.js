(function () {
    'use strict';

    var nav = angular.module('app.nav-consoleBus');

    var runFuntion = runFunction;

    nav.config(configFunction);
    nav.run(runFuntion);

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
            .state('workspace.apptabs.sidenav.petals.nav', {
                url: '/bus',
                views: {
                    'navConsoleView': {
                        controller: 'NavConsoleBusController',
                        templateUrl: 'src/client/app/petals/bus/nav-console/nav-console.html',
                        onEnter: function () {
                            console.log("You are in NAV CONSOLE");
                        }

                    }
                }
            })
            .state('workspace.apptabs.sidenav.petals.nav.overview', {
                url: '/overview',
                views: {
                    'busOverviewView': {
                        controller: 'OverviewBusController',
                        templateUrl: 'src/client/app/petals/bus/overview/overview.html',
                        onEnter: function () {
                            console.log("You are in BUS OVERVIEW");
                        }
                    }
                }
            })
            .state('workspace.apptabs.sidenav.petals.nav.config', {
                url: '/config',
                views: {
                    'busConfigView': {
                        controller: 'ConfigBusController',
                        templateUrl: 'src/client/app/petals/bus/config/config.html',
                        onEnter: function () {
                            console.log("You are in BUS CONFIG");
                        }
                    }
                }
            });
    }
})();
