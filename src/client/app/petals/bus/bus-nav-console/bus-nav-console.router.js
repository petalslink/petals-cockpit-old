(function () {
    'use strict';

    var nav = angular.module('app.nav-consoleBus');

    var runFuntion = runFunction;

    nav.config(configFunction);
    nav.run(runFuntion);

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

        $urlRouterProvider
            .otherwise('/workspace');

/*        $stateProvider
/!*            .state('core.workspace.petals.bus', {
                url: '/bus'
            })*!/
            .state('core.workspace.petals.bus.overview', {
                url: '/overview-bus',
                views: {
                    'busOverviewView': {
                        controller: 'OverviewBusController',
                        templateUrl: 'src/client/app/petals/bus/bus-overview/bus-overview.html',
                        onEnter: function () {
                            console.log("You are in BUS OVERVIEW");
                        }
                    }
                }
            })
            .state('core.workspace.petals.bus.config', {
                url: '/config-bus',
                views: {
                    'busConfigView': {
                        controller: 'ConfigBusController',
                        templateUrl: 'src/client/app/petals/bus/bus-config/bus-config.html',
                        onEnter: function () {
                            console.log("You are in BUS CONFIG");
                        }
                    }
                }
            });*/
    }
})();
