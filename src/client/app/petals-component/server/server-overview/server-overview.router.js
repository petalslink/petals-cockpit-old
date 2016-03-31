(function () {
    'use strict';

    var overviewServer = angular.module('app.overviewServer');

    var runFuntion = runFunction;

    overviewServer.config(configFunction);
    overviewServer.run(runFuntion);

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
            .state('workspace.petals.server.overview', {
                url: '/overview',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'OverviewServerController',
                        templateUrl: 'src/client/app/petals-component/server/server-overview/server-overview.html',
                        onEnter: function () {
                            console.log("You are in OVERVIEW SERVER");
                        }
                    }
                }
            })

    }
})();
