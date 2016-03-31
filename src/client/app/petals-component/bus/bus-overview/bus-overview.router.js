(function () {
    'use strict';

    var overviewBus = angular.module('app.overviewBus');

    var runFuntion = runFunction;

    overviewBus.config(configFunction);
    overviewBus.run(runFuntion);

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
            .state('workspace.petals.bus.overview', {
                url: '/overview',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'OverviewBusController',
                        templateUrl: 'src/client/app/petals-component/bus/bus-overview/bus-overview.html',
                        onEnter: function () {
                            console.log("You are in OVERVIEW BUS");
                        }
                    }
                }
            })

    }
})();
