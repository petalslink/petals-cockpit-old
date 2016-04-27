(function () {
    'use strict';

    var suProvide = angular.module('petalsComponent.bc-soap.su-consume');

    suProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap-su-consume', {
                url: '/bc-soap-su-consume/:id',
                views: {
                    'petals-nav-console@home.workspace.petals': {
                        templateUrl: 'src/client/app/petals-component/bc-soap/su-consume/su-consume.html',
                        controller: 'SuConsumeController',
                        controllerAs: 'vmSuConsume'
                    },
                    'petals-console@home.workspace.petals': {
                        template: '<div ui-view="petals-console"></div>',
                        controller: ''
                    },
                    resolve: {
                        promiseSUDetails: function(dataservice, $stateParams) {
                            return dataservice.getPetalsComponent($stateParams.id);
                        }
                    },
                    onEnter: ['logger', function (logger) {
                        logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-CONSUME');
                    }],
                    onReactivate: ['logger', function (logger) {
                        logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-CONSUME');
                    }]
                }
            });

    }
})();
