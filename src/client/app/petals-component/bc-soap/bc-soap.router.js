(function () {
    'use strict';

    var bcSoap = angular.module('app.bc-soap');

    var runFuntion = runFunction;

    bcSoap.config(configFunction);
    bcSoap.run(runFuntion);

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

            .state('workspace.petals.bc-soap', {
                url: '/bc-soap',
                sticky: true,
                dsr: true,
                views: {
                    'petals-nav-console': {
                        controller: 'BcSoapController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/bc-soap.html',
                        onEnter: function () {
                            console.log("You are in PETALS NAV CONSOLE BC-SOAP");
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
