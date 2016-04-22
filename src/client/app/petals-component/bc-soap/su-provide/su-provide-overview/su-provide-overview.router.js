(function () {
    'use strict';

    var overviewSuProvide = angular.module('app.overviewSuProvide');

    overviewSuProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.su-provide.overview', {
                url: '/overview',
                views: {
                    'petals-console': {
                        controller: 'OverviewSuProvideController',
                        templateUrl: './su-provide-overview.html'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE.OVERVIEW');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE.OVERVIEW');
                }]

            });

    }
})();
