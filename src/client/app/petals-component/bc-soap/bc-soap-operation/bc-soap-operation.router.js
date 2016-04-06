(function () {
    'use strict';

    var operationBcSoap = angular.module('app.operationBcSoap');

    var runFuntion = runFunction;

    operationBcSoap.config(configFunction);
    operationBcSoap.run(runFuntion);

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
            .state('workspace.petals.bc-soap.operation', {
                url: '/operation',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'OperationBcSoapController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/bc-rest-operation/bc-soap-operation.html',
                        onEnter: function () {
                            console.log("You are in OPERATION BC-SOAP");
                        }
                    }
                }
            })

    }
})();
