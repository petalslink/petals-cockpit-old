(function () {
    'use strict';

    var server = angular.module('petalsComponent.server');

    server.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.server', {
                url: '/server/:id',
                views: {
                    'petals-nav-console': {
                        templateUrl: 'src/client/app/petals-component/server/server.html',
                        controller: 'ServerController',
                        controllerAs: 'vmServer'
                    },
                    'petals-console': {
                        template: '<div ui-view="petals-console" layout-fill></div>',
                        controller: ''
                    }
                },
                resolve: {
                    serverData:[ 'dataservice', '$stateParams', function(dataservice, $stateParams) {
                        return dataservice.getPetalsComponent($stateParams.id);
                    }],
                    elementData: ['$stateParams', 'workspaceData', function($stateParams, wsData){
                        return wsData.getComponentById($stateParams.id);
                    }]
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.SERVER');
                }]
            });

    }

})();
