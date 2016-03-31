(function () {
    'use strict';

    var server = angular.module('app.server');

    var runFuntion = runFunction;

    server.config(configFunction);
    server.run(runFuntion);

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

            .state('workspace.petals.server', {
                url: '/server',
                sticky: true,
                dsr: true,
                views: {
                    'petals-nav-console': {
                        controller: 'ServerController',
                        templateUrl: 'src/client/app/petals-component/server/server.html',
                        onEnter: function () {
                            console.log("You are in PETALS NAV CONSOLE SERVER");
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
