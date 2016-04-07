(function () {
    'use strict';

    var overviewSeQuartz = angular.module('app.overviewSeQuartz');

    var runFuntion = runFunction;

    overviewSeQuartz.config(configFunction);
    overviewSeQuartz.run(runFuntion);

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
            .state('workspace.petals.se-quartz.overview', {
                url: '/overview',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'OverviewSeQuartzController',
                        templateUrl: 'src/client/app/petals-component/se-quartz/se-quartz-overview/se-quartz-overview.html',
                        onEnter: function () {
                            console.log("You are in OVERVIEW SE-QUARTZ");
                        }
                    }
                }
            })

    }
})();
