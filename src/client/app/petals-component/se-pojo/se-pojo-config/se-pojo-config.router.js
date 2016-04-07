(function () {
    'use strict';

    var configSeQuartz = angular.module('app.configSeQuartz');

    var runFuntion = runFunction;

    configSeQuartz.config(configFunction);
    configSeQuartz.run(runFuntion);

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
            .state('workspace.petals.se-quartz.config', {
                url: '/config',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'ConfigSeQuartzController',
                        templateUrl: 'src/client/app/petals-component/se-quartz/se-quartz-config/se-quartz-config.html',
                        onEnter: function () {
                            console.log("You are in CONFIG SE-QUARTZ");
                        }
                    }
                }
            })

    }
})();
