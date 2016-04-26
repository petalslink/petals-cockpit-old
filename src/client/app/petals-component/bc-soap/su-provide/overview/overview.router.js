(function () {
    'use strict';

    var overviewSuProvide = angular.module('petalsComponent.bc-soap.su-provide.overview');

    overviewSuProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.su-provide.overview', {
                url: '/overview',
                views: {
                    /* jshint ignore:start */
                    'petals-console': {
                        controller: 'OverviewSuProvideController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/su-provide/overview/overview.html'
                    }
                    /* jshint ignore:end */
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
