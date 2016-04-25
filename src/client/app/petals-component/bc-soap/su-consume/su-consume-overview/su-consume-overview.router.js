(function () {
    'use strict';

    var overviewSuProvide = angular.module('petalsComponent.bc-soap.su-consume.overview');

    overviewSuProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.su-consume.overview', {
                url: '/overview',
                views: {
                    /* jshint ignore:start */
                    'petals-console': {
                        controller: 'OverviewSuConsumeController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/su-provide/su-consume-overview/su-consume-overview.html'
                    }
                    /* jshint ignore:end */
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-CONSUME.OVERVIEW');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-CONSUME.OVERVIEW');
                }]

            });

    }
})();
