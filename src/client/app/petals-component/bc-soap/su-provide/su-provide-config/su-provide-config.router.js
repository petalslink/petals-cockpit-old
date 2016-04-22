(function () {
    'use strict';

    var configSuProvide = angular.module('app.configSuProvide');

    configSuProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.su-provide.config', {
                url: '/config',
                views: {
                    'petals-console': {
                        controller: 'ConfigSuProvideController',
                        templateUrl: './su-provide-config.html'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE.CONFIG');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE.CONFIG');
                }]

            });

    }
})();
