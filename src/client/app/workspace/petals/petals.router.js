(function () {
    'use strict';

    var petals = angular.module('app.petals');

    var runFuntion = runFunction;

    petals.config(configFunction);
    petals.run(runFuntion);

    runFunction.$inject = ['$rootScope', 'logger', 'petalsService'];

    /* @ngInject */
    function runFunction($rootScope, logger, petalsService) {
        $rootScope.$on('$stateChangeError', function(event, toState){
            logger.debug('------------------------------------------------------------------');
            logger.debug('*** petals.router.js $on $stateChangeError:');
            logger.debug('  ------> event        : ' + angular.toJson(event));
            logger.debug('  ------> toState      : ' + angular.toJson(toState));
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState){
            logger.debug('------------------------------------------------------------------');
            logger.debug('*** petals.router.js $on $stateChangeSuccess:');
            logger.debug('  ------> event        : ' + angular.toJson(event));
            logger.debug('  ------> toState      : ' + angular.toJson(toState));
            // set selectedComponent depending on url
            var path = $rootScope.$location.path();
            var componentPath = path.split('/workspace/petals/');
            if (componentPath[1]) {
                var id = parseInt(componentPath[1].split('/')[1],10);
                petalsService.setSelectedComponentId(id);
            }
        });
    }

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
                    logger.debug('You enter in WORKSPACE.PETALS');
                }],
                onReactivate: ['dataWkspceService', 'logger', function (dataWkspceService, logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS');
                    dataWkspceService.resetStateInfoSelect('PETALS');
                }],
                onInactivate: ['dataWkspceService', function (dataWkspceService) {
                    dataWkspceService.storeStateInfoSelect('PETALS');

                }]

            });

    }
})();
