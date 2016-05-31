(function () {
    'use strict';

    var configSuProvide = angular.module('petalsComponent.bc-soap.su-provide.config');

    configSuProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap-su-provide.su-config', {
                url: '/config',
                views: {
                    'petals-console': {
                        controller: 'ConfigBcSoapSuProvideController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/su-provide/config/config.html',
                        controllerAs: 'vmBcSoapSuProvideConfig'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You enter in WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE.CONFIG');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE.CONFIG');
                }]

            });

    }
})();
