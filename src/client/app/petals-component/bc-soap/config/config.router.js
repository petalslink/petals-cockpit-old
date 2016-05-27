(function () {
    'use strict';

    var configBcSoap = angular.module('petalsComponent.bc-soap.config');

    configBcSoap.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.config', {
                url: '/config',
                views: {
                    'petals-console': {
                        controller: 'ConfigBcSoapController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/config/config.html',
                        controllerAs: 'vmBcSoapConfig'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You enter in WORKSPACE.PETALS.BC-SOAP.CONFIG');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.BC-SOAP.CONFIG');
                }]

            });

    }
})();
