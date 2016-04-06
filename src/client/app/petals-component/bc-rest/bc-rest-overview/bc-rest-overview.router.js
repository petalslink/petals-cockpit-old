(function () {
    'use strict';

    var overviewBcRest = angular.module('app.overviewBcRest');

    var runFuntion = runFunction;

    overviewBcRest.config(configFunction);
    overviewBcRest.run(runFuntion);

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
            .state('workspace.petals.bc-rest.overview', {
                url: '/overview',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'OverviewBcRestController',
                        templateUrl: 'src/client/app/petals-component/bc-rest/bc-rest-overview/bc-rest-overview.html',
                        onEnter: function () {
                            console.log("You are in OVERVIEW BC-REST");
                        }
                    }
                }
            })

    }
})();
