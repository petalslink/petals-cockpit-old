(function () {
    'use strict';

    var bus = angular.module('app.bus');

    var runFuntion = runFunction;

    bus.config(configFunction);
    bus.run(runFuntion);

    runFunction.$inject = ['$rootScope', '$state', '$stateParams'];

    /* @ngInject */
    function runFunction($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    configFunction.$inject = ['$locationProvider', '$stateProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider

            .state('workspace.petals.bus', {
                url: '/bus/:id',
                views: {
                    'petals-nav-console': {
                        controller: 'BusController',
                        templateUrl: 'src/client/app/petals-component/bus/bus.html'

                },
                    'petals-console': {
                        template: '<div ui-view="petals-console"></div>',
                        controller: ''
                    }
                },
                resolve: {
                    promiseDetails: function(dataservice, $stateParams) {
                        return dataservice.getPetalsComponent($stateParams.id);
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BUS');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BUS');
                }]
            });
    }
})();
