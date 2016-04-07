(function () {
    'use strict';

    var operationSePojo = angular.module('app.operationSePojo');

    var runFuntion = runFunction;

    operationSePojo.config(configFunction);
    operationSePojo.run(runFuntion);

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
            .state('workspace.petals.se-pojo.operation', {
                url: '/operation',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'OperationSePojoController',
                        templateUrl: 'src/client/app/petals-component/se-pojo/se-pojo-operation/se-pojo-operation.html',
                        onEnter: function () {
                            console.log("You are in OPERATION SE-POJO");
                        }
                    }
                }
            })

    }
})();
