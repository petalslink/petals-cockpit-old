(function () {
    'use strict';

    var suConsume = angular.module('petalsComponent.bc-soap.su-consume');

    suConsume.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap-su-consume', {
                url: '/bc-soap-su-consume/:id',
                views: {
                    'petals-nav-console': {
                        templateUrl: 'src/client/app/petals-component/bc-soap/su-consume/su-consume.html',
                        controller: 'BcSoapSuConsumeController',
                        controllerAs: 'vmBcSoapSuConsume'
                    },
                    'petals-console': {
                        template: '<div ui-view="petals-console" layout-fill></div>',
                        controller: ''
                    }
                },
                resolve: {
                    promiseSUDetails: ['dataservice', '$stateParams', function (dataservice, $stateParams) {
                        return dataservice.getPetalsComponent($stateParams.id);
                    }]
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You enter in WORKSPACE.PETALS.BC-SOAP.SU-CONSUME');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.BC-SOAP.SU-CONSUME');
                }]
            });

    }
})();
