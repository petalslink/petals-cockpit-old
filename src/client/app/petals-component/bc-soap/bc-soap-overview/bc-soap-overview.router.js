(function () {
    'use strict';

    var overviewBcSoap = angular.module('app.overviewBcSoap');

    overviewBcSoap.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.overview', {
                url: '/overview',
                views: {
                    'petals-console': {
                        controller: 'OverviewBcSoapController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/bc-soap-overview/bc-soap-overview.html'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.OVERVIEW');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.OVERVIEW');
                }]

            });

    }
})();
