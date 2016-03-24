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
            .state('workspace', {
                url: '/workspace',
                views: {
                    '': {
                        templateUrl: 'src/client/app/workspace/workspace.html',
                        controller: 'WorkspaceController',
                        onEnter: function () {
                            console.log("You are in WORKSPACE");
                        }
                    }
                }
            });

/*        $urlRouterProvider
            .otherwise('/workspace');

        $stateProvider
            .state('core.workspace', {
                url: '/workspace',
                views: {
                    'sidenav': {
                        templateUrl: 'src/client/app/layout/sidenav/sidenav.html',
                        controller: 'SidenavController',
                        onEnter: function () {
                            console.log("You are in SIDENAV");
                        }
                    },
                    /!* Affiche la console qui charge la nav console *!/
                    'console': {
                        templateUrl: 'src/client/app/layout/console/console.html',
                        controller: 'ConsoleController',
                        onEnter: function () {
                            console.log("You are in CONSOLE");
                        }
                    }
                }
            });*/
    }
})();
