(function () {
    'use strict';

    var bcRest = angular.module('app.bc-rest');

    var runFuntion = runFunction;

    bcRest.config(configFunction);
    bcRest.run(runFuntion);

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

            .state('workspace.petals.bc-rest', {
                url: '/bc-rest',
                sticky: true,
                dsr: true,
                views: {
                    'petals-nav-console': {
                        controller: 'BcRestController',
                        templateUrl: 'src/client/app/petals-component/bc-rest/bc-rest.html',
                        onEnter: function () {
                            console.log("You are in PETALS NAV CONSOLE BC-REST");
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
