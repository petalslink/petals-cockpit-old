(function () {
    'use strict';

    var server = angular.module('app.server');

    var runFuntion = runFunction;

    server.config(configFunction);
    server.run(runFuntion);

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
            .state('workspace.petals.server', {
                url: '/server/:id',
                views: {
                    'petals-nav-console': {
                        controller: 'ServerController',
                        templateUrl: 'src/client/app/petals-component/server/server.html'
                    },
                    'petals-console': {
                        template: '<div ui-view="petals-console"></div>',
                        controller: ''
                    }
                },
                resolve: {
                    promiseDetails: function(dataservice, $stateParams) {
                        return dataservice.getPetalsComponent($stateParams.id);
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER');
                }]
            });

    }

})();
