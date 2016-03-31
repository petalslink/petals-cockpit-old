(function () {
    'use strict';

    var operationServer = angular.module('app.operationServer');

    var runFuntion = runFunction;

    operationServer.config(configFunction);
    operationServer.run(runFuntion);

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

        $stateProvider
            .state('workspace.petals.server.operation', {
                url: '/operation',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'OperationServerController',
                        templateUrl: 'src/client/app/petals-component/server/server-operation/server-operation.html',
                        onEnter: function () {
                            console.log("You are in OPERATION SERVER");
                        }
                    }
                }
            })

    }
})();
