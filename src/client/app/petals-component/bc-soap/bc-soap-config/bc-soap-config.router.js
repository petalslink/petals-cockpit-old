(function () {
    'use strict';

    var configBcSoap = angular.module('app.configBcSoap');

    var runFuntion = runFunction;

    configBcSoap.config(configFunction);
    configBcSoap.run(runFuntion);

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
            .state('workspace.petals.bc-soap.config', {
                url: '/config',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'ConfigBcSoapController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/bc-soap-config/bc-soap-config.html',
                        onEnter: function () {
                            console.log("You are in CONFIG BC-SOAP");
                        }
                    }
                }
            })

    }
})();
