(function () {
    'use strict';

    var userServer = angular.module('petalsComponent.server.user');

    userServer.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.server.user', {
                url: '/user',
                views: {
                    'petals-console': {
                        templateUrl: 'src/client/app/petals-component/server/user/user.html',
                        controller: 'UserServerController',
                        controllerAs: 'vmServerUser'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER.USER');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.SERVER.USER');
                }]
            });
    }
})();
