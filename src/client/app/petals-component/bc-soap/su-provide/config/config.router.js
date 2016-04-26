(function () {
    'use strict';

    var configSuProvide = angular.module('petalsComponent.bc-soap.su-provide.config');

    configSuProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.su-provide.config', {
                url: '/config',
                views: {
                    /* jshint ignore:start */
                    'petals-console': {
                        controller: 'ConfigSuProvideController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/su-provide/config/config.html'
                    }
                    /* jshint ignore:end */
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
