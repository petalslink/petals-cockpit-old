(function () {
    'use strict';

    var petals = angular.module('app.petals');

    petals.config(configFunction);

    configFunction.$inject = ['$stateProvider'];
    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals', {
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
                        template: '<div ui-view="petals-console" ' +
                        'layout="column" layout-align="start stretch" layout-fill flex></div>',
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
