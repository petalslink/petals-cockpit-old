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
                params: {
                    element: null
                },
                views: {
                    'petals-nav-console': {
                        templateUrl: 'src/client/app/petals-component/bc-soap/bc-soap.html',
                        controller: 'BcSoapController',
                        controllerAs: 'vmBcSoap'
                    },
                    'petals-console': {
                        template: '<div ui-view="petals-console" layout-fill></div>',
                        controller: ''
                    }
                },
                resolve: {
                    bcsoapData: [ 'dataservice', '$stateParams', function(dataservice, $stateParams) {
                        return dataservice.getPetalsComponent($stateParams.id);
                    }],
                    elementData: ['$stateParams', 'workspaceData', function($stateParams, wsData){
                        return wsData.getComponentById($stateParams.id);
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
