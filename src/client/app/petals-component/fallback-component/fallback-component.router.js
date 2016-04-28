(function () {
    'use strict';

    var fallbackComponent = angular.module('petalsComponent.fallback-component');

    fallbackComponent.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.fallback-component', {
                url: '/fallback-component/:id',
                views: {
                    'petals-nav-console': {
                        template: '<div></div>'
                    },
                    'petals-console': {
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
