(function () {
    'use strict';

    var suProvide = angular.module('petalsComponent.bc-soap.su-provide');

    suProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap-su-provide', {
                url: '/bc-soap-su-provide/:id',
                views: {
                    'petals-nav-console': {
                        templateUrl: 'src/client/app/petals-component/bc-soap/su-provide/su-provide.html',
                        controller: 'SuProvideController',
                        controllerAs: 'vmSuProvide'
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
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE');
                }]
            });

    }
})();
