(function () {
    'use strict';

    var server = angular.module('app.server');

    server.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.server', {
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
                    promiseDetails:[ 'dataservice', '$stateParams', function(dataservice, $stateParams) {
                        return dataservice.getPetalsComponent($stateParams.id);
                    }]
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
