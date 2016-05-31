(function () {
    'use strict';

    var overviewSuProvide = angular.module('petalsComponent.bc-soap.su-provide.overview');

    overviewSuProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap-su-provide.su-overview', {
                url: '/overview',
                views: {
                    'petals-console': {
                        controller: 'OverviewSuProvideController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/su-provide/overview/overview.html'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You enter in WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE.OVERVIEW');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE.OVERVIEW');
                }]

            });

    }
})();
