(function () {
    'use strict';

    var fallbackComponent = angular.module('app.fallbackComponent');

    fallbackComponent.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.fallbackComponent', {
                url: '/fallbackComponent',
                views: {
                    'petals-nav-console': {
                        controller: '',
                        template: '<div></div>'
                    },
                    'petals-console': {
                        controller: 'fallbackComponentController',
                        templateUrl: 'src/client/app/petals-component/fallbackComponent/fallbackComponent.html'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.FALLBACKCOMPONENT');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.FALLBACKCOMPONENT');
                }]
            });

    }

})();
