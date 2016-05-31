(function () {
    'use strict';

    var overviewSuProvide = angular.module('petalsComponent.bc-soap.su-consume.overview');

    overviewSuProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap-su-consume.su-overview', {
                url: '/overview',
                views: {
                    'petals-console': {
                        controller: 'OverviewBcSoapSuConsumeController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/su-consume/overview/overview.html',
                        controllerAs: 'vmBcSoapSuConsumeOverview'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You enter in WORKSPACE.PETALS.BC-SOAP.SU-CONSUME.OVERVIEW');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.BC-SOAP.SU-CONSUME.OVERVIEW');
                }]

            });

    }
})();
