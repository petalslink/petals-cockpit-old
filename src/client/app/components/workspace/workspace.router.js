(function () {
    'use strict';

    var workspace = angular.module('app.workspace');

    var runFuntion = runFuntion;

    workspace.config(configFunction);
    workspace.run(runFuntion);

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
            .state('core.workspace', {
                url: '/workspace',
/*                abstract: true,*/
                views: {
                    'menuView': {
                        templateUrl: 'src/client/app/components/menu/menu.html',
                        controller: 'MenuController',
                        onEnter: function () {
                            console.log("You are in MENU");
                        }
                    },
                    'sidenavView': {
                        templateUrl: 'src/client/app/components/sidenav/sidenav.html',
                        controller: 'SidenavController',
                        onEnter: function () {
                            console.log("You are in SIDENAV");
                        }
                    },
                    /* Affiche la console qui charge la nav console */
                    'consoleView': {
                        templateUrl: 'src/client/app/components/console/console.html',
                        controller: 'ConsoleController',
                        onEnter: function () {
                            console.log("You are in CONSOLE");
                        }
                    }
                }
            });
    }
})();
