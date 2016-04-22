(function () {
    'use strict';

    var suProvide = angular.module('app.su-provide');

    suProvide.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.bc-soap.su-provide', {
                url: '/su-provide/:id',
                views: {
                    'petals-nav-console': {
                        controller: 'SuProvideController',
                        templateUrl: 'src/client/app/petals-component/bc-soap/su-provide/su-provide.html'
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
                        logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE');
                    }],
                    onReactivate: ['logger', function (logger) {
                        logger.debug('You are in WORKSPACE.PETALS.BC-SOAP.SU-PROVIDE');
                    }]
                }
            });

    }
})();
