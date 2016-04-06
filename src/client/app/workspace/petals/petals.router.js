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

    configFunction.$inject = ['$locationProvider', '$stickyStateProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stickyStateProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider
            .otherwise('/workspace');

        $stateProvider
            .state('workspace.petals', {
                url: '/petals',
                sticky: true,
                dsr: true,
                views: {
                    'petals-sidenav': {
                        templateUrl: 'src/client/app/workspace/petals/petals.html',
                        directive: 'tmplTree',
                        controller: 'PetalsController',
                        onEnter: function () {
                            console.log("======================> You are in PETALS");
                        }
                    },
                    'petals-nav-console': {
                        template: '<div ui-view="petals-nav-console"></div>',
                        controller: '',
                        onEnter: function () {
                            console.log("You are in NAV");
                        }
                    },
                    'petals-console': {
                        template: '<div ui-view="petals-console" layout="column" layout-align="start stretch"></div>',
                        controller: '',
                        onEnter: function () {
                            console.log("You are in CONSOLE");
                        }
                    }
                },
                resolve: {
                    promiseData: function(dataservice) {
                        return dataservice.getPetalsComponents().then(function(data){
                            console.log("*** data dans promiseData:");
                            console.log(angular.toJson(data));
                            return data;
                        });
                    },
                    promiseConfig: function(dataservice) {
                        return dataservice.getPetalsComponentConfig().then(function(data){
                            console.log("*** config dans promiseData:");
                            console.log(angular.toJson(data));
                            return data;
                        });
                    }
                }
            });

 //       $stickyStateProvider.enableDebug(true);
    }
})();
