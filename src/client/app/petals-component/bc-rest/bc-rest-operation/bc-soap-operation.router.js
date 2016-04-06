(function () {
    'use strict';

    var operationBcRest = angular.module('app.operationBcRest');

    var runFuntion = runFunction;

    operationBcRest.config(configFunction);
    operationBcRest.run(runFuntion);

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
            .state('workspace.petals.bc-rest.operation', {
                url: '/operation',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'OperationServerController',
                        templateUrl: 'src/client/app/petals-component/bc-rest/bc-rest-operation/bc-rest-operation.html',
                        onEnter: function () {
                            console.log("You are in OPERATION BC-REST");
                        }
                    }
                }
            })

    }
})();
