(function () {
    'use strict';

    var menu = angular.module('app.menu');

    var runFuntion = runFuntion;

    menu.config(configFunction);
    menu.run(runFuntion);

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
            .otherwise('/');

/*        $stateProvider
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
            .state('core.workspace.petals.bus', {
                url: '/bus',
                views: {
                    'busNavConsole': {
                        controller: 'NavConsoleBusController',
                        templateUrl: 'src/client/app/petals/bus/bus-nav-console/bus-nav-console.html',
                        onEnter: function () {
                            console.log("You are in NAV CONSOLE BUS");
                        }
                    }
                }
            })
            .state('core.workspace.petals.server', {
                url: '/server',
                views: {
                    'serverNavConsole': {
                        controller: 'NavConsoleServerController',
                        templateUrl: 'src/client/app/petals/server/server-nav-console/server-nav-console.html',
                        onEnter: function () {
                            console.log("You are in NAV CONSOLE SERVER");
                        }
                    }
                }
            });*/
/*        $stateProvider.state('core.workspace.petals.bus', {
            url: '/bus',
            views: {
                'busNavConsole': {
                    controller: 'NavConsoleBusController',
                    templateUrl: 'src/client/app/petals/bus/bus-nav-console/bus-nav-console.html',
                    onEnter: function () {
                        console.log("You are in NAV CONSOLE");
                    }
                }
            }
        });*/

        $stickyStateProvider.enableDebug(true);
    }
})();
