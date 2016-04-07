(function () {
    'use strict';

    var overviewSePojo = angular.module('app.overviewSePojo');

    var runFuntion = runFunction;

    overviewSePojo.config(configFunction);
    overviewSePojo.run(runFuntion);

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
            .state('workspace.petals.se-pojo.overview', {
                url: '/overview',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'OverviewSeQuartzController',
                        templateUrl: 'src/client/app/petals-component/se-pojo/se-pojo-overview/se-pojo-overview.html',
                        onEnter: function () {
                            console.log("You are in OVERVIEW SE-POJO");
                        }
                    }
                }
            })

    }
})();
