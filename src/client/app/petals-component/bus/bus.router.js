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
                        templateUrl: 'src/client/app/petals-component/bus/bus.html',
                        controller: 'BusController',
                        controllerAs: 'vmBus'
                    },
                    'petals-console': {
                        template: '<div ui-view="petals-console" layout-fill></div>',
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
