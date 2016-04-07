(function () {
    'use strict';

    var operationBcMail = angular.module('app.operationBcMail');

    var runFuntion = runFunction;

    operationBcMail.config(configFunction);
    operationBcMail.run(runFuntion);

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
            .state('workspace.petals.bc-mail.operation', {
                url: '/operation',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'OperationBcMailController',
                        templateUrl: 'src/client/app/petals-component/bc-mail/bc-mail-operation/bc-mail-operation.html',
                        onEnter: function () {
                            console.log("You are in OPERATION BC-MAIL");
                        }
                    }
                }
            })

    }
})();
