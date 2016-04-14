(function () {
    'use strict';

    var overviewBcSoap = angular.module('app.overviewBcSoap');

    var runFuntion = runFunction;

    overviewBcSoap.config(configFunction);
    overviewBcSoap.run(runFuntion);

    runFunction.$inject = ['$rootScope', '$state', '$stateParams'];

    /* @ngInject */
    function runFunction($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    configFunction.$inject = ['$locationProvider', '$stateProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('workspace.petals.bc-soap.overview', {
                url: '/overview',
                sticky: true,
                dsr: true,
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
