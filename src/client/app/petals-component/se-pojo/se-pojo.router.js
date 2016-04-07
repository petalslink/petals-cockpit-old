(function () {
    'use strict';

    var sePojo = angular.module('app.se-pojo');

    var runFuntion = runFunction;

    sePojo.config(configFunction);
    sePojo.run(runFuntion);

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

            .state('workspace.petals.se-pojo', {
                url: '/se-pojo',
                sticky: true,
                dsr: true,
                views: {
                    'petals-nav-console': {
                        controller: 'SePojoController',
                        templateUrl: 'src/client/app/petals-component/se-pojo/se-pojo.html',
                        onEnter: function () {
                            console.log("You are in PETALS NAV CONSOLE SE-POJO");
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
