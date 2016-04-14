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
            .otherwise('/workspace');

        $stateProvider
            .state('workspace.petals', {
                url: '/petals',
                sticky: true,
                dsr: true,
                views: {
                    'petals-sidenav': {
                        templateUrl: 'src/client/app/workspace/petals/petals.html',
                        controller: 'PetalsController',
                        controllerAs: 'vmPetals'
                    },
                    'petals-nav-console': {
                        template: '<div ui-view="petals-nav-console"></div>',
                        controller: ''
                    },
                    'petals-console': {
                        template: '<div ui-view="petals-console" layout="column" layout-align="start stretch"></div>',
                        controller: ''
                    }
                },
                resolve: {
                    promiseData: function(dataservice) {
                        return dataservice.getPetalsComponents();
                    },
                    promiseConfig: function(dataservice) {
                        return dataservice.getPetalsComponentConfig();
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS');
                }],
                onReactivate: ['dataWkspceService', 'logger', function (dataWkspceService, logger) {
                    logger.debug('You are in WORKSPACE.PETALS');
                    dataWkspceService.resetStateInfoSelect('PETALS');
                }],
                onInactivate: ['dataWkspceService', function (dataWkspceService) {
                    dataWkspceService.storeStateInfoSelect('PETALS');

                }]

            });

    }
})();
