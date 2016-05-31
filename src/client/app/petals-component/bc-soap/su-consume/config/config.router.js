(function () {
    'use strict';

    var configSuProvide = angular.module('petalsComponent.bc-soap.su-consume.config');

    configSuProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap-su-consume.su-config', {
                url: '/config',
                views: {
                    'petals-console': {
                        controller: 'ConfigSuConsumeController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/su-consume/config/config.html'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You enter in WORKSPACE.PETALS.BC-SOAP.SU-CONSUME.CONFIG');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.BC-SOAP.SU-CONSUME.CONFIG');
                }]

            });

    }
})();
