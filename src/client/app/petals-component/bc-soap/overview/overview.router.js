(function () {
    'use strict';

    var overviewBcSoap = angular.module('petalsComponent.bc-soap.overview');

    overviewBcSoap.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.overview', {
                url: '/overview',
                views: {
                    'petals-console': {
                        templateUrl: 'src/client/app/petals-component/bc-soap/overview/overview.html',
                        controller: 'OverviewBcSoapController',
                        controllerAs: 'vmBcSoapOverview'
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
