(function () {
    'use strict';

    var operationSeQuartz = angular.module('app.operationSeQuartz');

    var runFuntion = runFunction;

    operationSeQuartz.config(configFunction);
    operationSeQuartz.run(runFuntion);

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
            .state('workspace.petals.se-quartz.operation', {
                url: '/operation',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'OperationSeQuartzController',
                        templateUrl: 'src/client/app/petals-component/se-quartz/se-quartz-operation/se-quartz-operation.html',
                        onEnter: function () {
                            console.log("You are in OPERATION SE-QUARTZ");
                        }
                    }
                }
            })

    }
})();
