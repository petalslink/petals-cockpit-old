(function () {
    'use strict';

    var bus = angular.module('petalsComponent.bus');

    bus.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bus', {
                url: '/bus/:id',
                views: {
                    'petals-nav-console': {
                        controller: 'BusController',
                        templateUrl: 'src/client/app/petals-component/bus/bus.html',
                        controllerAs: 'vmBus'

                    },
                    'petals-console': {
                        template: '<div ui-view="petals-console"></div>',
                        controller: ''
                    }
                },
                resolve: {
                    promiseDetails:[ 'dataservice', '$stateParams', function(dataservice, $stateParams) {
                        return dataservice.getPetalsComponent($stateParams.id);
                    }]
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You enter in WORKSPACE.PETALS.BUS');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.BUS');
                }]
            });
    }
})();
