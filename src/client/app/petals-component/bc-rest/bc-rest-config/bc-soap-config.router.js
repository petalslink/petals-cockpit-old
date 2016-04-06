(function () {
    'use strict';

    var configBcRest = angular.module('app.configBcRest');

    var runFuntion = runFunction;

    configBcRest.config(configFunction);
    configBcRest.run(runFuntion);

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
            .state('workspace.petals.bc-rest.config', {
                url: '/config',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'ConfigBcRestController',
                        templateUrl: 'src/client/app/petals-component/bc-rest/bc-rest-config/bc-rest-config.html',
                        onEnter: function () {
                            console.log("You are in CONFIG BC-REST");
                        }
                    }
                }
            })

    }
})();
