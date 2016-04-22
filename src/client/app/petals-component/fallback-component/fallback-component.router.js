(function () {
    'use strict';

    var fallbackComponent = angular.module('app.fallback-component');

    fallbackComponent.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.fallback-component', {
                url: '/fallback-component',
                views: {
                    'petals-nav-console': {
                        controller: '',
                        template: '<div></div>'
                    },
                    'petals-console': {
                        controller: 'FallbackComponentController',
                        templateUrl: 'src/client/app/petals-component/fallback-component/fallback-component.html'
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
