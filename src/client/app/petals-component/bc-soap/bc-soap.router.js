(function () {
    'use strict';

    var bcSoap = angular.module('app.bc-soap');

    bcSoap.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap', {
                url: '/bc-soap',
                sticky: true,
                dsr: true,
                views: {
                    'petals-nav-console': {
                        controller: 'BcSoapController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/bc-soap.html'
                    },
                    'petals-console': {
                        template: '<div ui-view="petals-console"></div>',
                        controller: ''
                    },
                    resolve: {
                        promiseDetails: function(dataservice, $stateParams) {
                            return dataservice.getPetalsComponent($stateParams.id);
                        }
                    },
                    onEnter: ['logger', function (logger) {
                        logger.debug('You are in WORKSPACE.PETALS.BC-SOAP');
                    }],
                    onReactivate: ['logger', function (logger) {
                        logger.debug('You are in WORKSPACE.PETALS.BC-SOAP');
                    }]
                }
            });

    }
})();
