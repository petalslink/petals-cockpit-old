(function () {
    'use strict';

    var bcSoap = angular.module('petalsComponent.bc-soap');

    bcSoap.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap', {
                url: '/bc-soap/:id',
                views: {
                    'petals-nav-console': {
                        templateUrl: 'src/client/app/petals-component/bc-soap/bc-soap.html',
                        controller: 'BcSoapController',
                        controllerAs: 'vmBcSoap'
                    },
                    'petals-console': {
                        template: '<div ui-view="petals-console"></div>',
                        controller: ''
                    }
                },
                resolve: {
                    promiseDetails: [ 'dataservice', '$stateParams', function(dataservice, $stateParams) {
                        return dataservice.getPetalsComponent($stateParams.id);
                    }]
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP');
                }]
            });

    }
})();
