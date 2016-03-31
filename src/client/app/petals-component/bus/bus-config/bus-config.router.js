(function () {
    'use strict';

    var configBus = angular.module('app.configBus');

    var runFuntion = runFunction;

    configBus.config(configFunction);
    configBus.run(runFuntion);

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
            .state('workspace.petals.bus.config', {
                url: '/config',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'ConfigBusController',
                        templateUrl: 'src/client/app/petals-component/bus/bus-config/bus-config.html',
                        onEnter: function () {
                            console.log("You are in CONFIG BUS");
                        }
                    }
                }
            })

    }
})();
