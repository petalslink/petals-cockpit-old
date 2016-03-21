(function () {
    'use strict';

    var nav = angular.module('app.nav-consoleServer');

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
            .otherwise('/workspace');

        $stateProvider
/*            .state('core.workspace.petals.bus', {
                url: '/bus'
            })*/
            .state('core.workspace.petals.server.overview', {
                url: '/overview-server',
                views: {
                    'serverOverviewView': {
                        controller: 'OverviewServerController',
                        templateUrl: 'src/client/app/petals/server/server-overview/server-overview.html',
                        onEnter: function () {
                            console.log("You are in SERVER OVERVIEW");
                        }
                    }
                }
            })
            .state('core.workspace.petals.server.config', {
                url: '/config-server',
                views: {
                    'serverConfigView': {
                        controller: 'ConfigServerController',
                        templateUrl: 'src/client/app/petals/server/server-config/server-config.html',
                        onEnter: function () {
                            console.log("You are in SERVER CONFIG");
                        }
                    }
                }

            })
            .state('core.workspace.petals.server.operation', {
                url: '/operation-server',
                views: {
                    'serverOperationView': {
                        controller: 'OperationServerController',
                        templateUrl: 'src/client/app/petals/server/server-operation/server-operation.html',
                        onEnter: function () {
                            console.log("You are in SERVER OPERATION");
                        }
                    }
                }
            });

    }
})();
