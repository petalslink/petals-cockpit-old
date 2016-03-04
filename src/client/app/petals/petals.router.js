(function () {
    'use strict';

    var petals = angular.module('app.petals');

    var runFuntion = runFunction;

    petals.config(configFunction);
    petals.run(runFuntion);

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
            .otherwise('/');

        $stateProvider
            .state('workspace.apptabs.sidenav.petals', {
                url: '/petals',
                views: {
                    'petalsView': {
                        templateUrl: 'src/client/app/petals/petals.html',
                        directive: 'tmplTree',
                        controller: 'PetalsController',
                        onEnter: function () {
                            console.log("You are in PETALS");
                        }
                        /* OTHERS VIEWS COMING (SERVICE & API) */
                    },
                    'consoleView': {
                        templateUrl: 'src/client/app/components/console/console.html',
                        controller: 'ConsoleController',
                        onEnter: function () {
                            console.log("You are in CONSOLE");
                        }
                    }
                }
            });
    }
})();
