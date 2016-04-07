(function () {
    'use strict';

    var seQuartz = angular.module('app.se-quartz');

    var runFuntion = runFunction;

    seQuartz.config(configFunction);
    seQuartz.run(runFuntion);

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

            .state('workspace.petals.se-quartz', {
                url: '/se-quartz',
                sticky: true,
                dsr: true,
                views: {
                    'petals-nav-console': {
                        controller: 'SeQuartzController',
                        templateUrl: 'src/client/app/petals-component/se-quartz/se-quartz.html',
                        onEnter: function () {
                            console.log("You are in PETALS NAV CONSOLE SE-QUARTZ");
                        }
                    },
                    'petals-console': {
                        template: '<div ui-view="petals-console"></div>',
                        controller: '',
                        onEnter: function () {
                            console.log("You are in PETALS CONSOLE");
                        }
                    }

                }
            })

    }
})();
