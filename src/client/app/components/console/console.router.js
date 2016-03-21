(function () {
    'use strict';

    var console = angular.module('app.console');

    var runFuntion = runFunction;

    console.config(configFunction);
    console.run(runFuntion);

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

/*        $stateProvider
            .state('core.workspace.petals.bus', {
                url: '/bus',
                views: {
/!*                    'navConsoleView': {
                        controller: 'NavConsoleBusController',
                        templateUrl: 'src/client/app/petals/bus/nav-console/nav-console.html',
                        onEnter: function () {
                            console.log("You are in NAV CONSOLE");
                        }

                    },*!/
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
                    }
                }
            });*/

    }
})();
