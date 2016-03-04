(function () {
    'use strict';

    var workspace = angular.module('app.workspace');

    var runFuntion = runFuntion;

    workspace.config(configFunction);
    workspace.run(runFuntion);

    runFunction.$inject = ['$rootScope', '$state', '$stateParams'];

    /* @ngInject */
    function runFunction($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
/*        $state.transitionTo('workspace.apptabs');*/
    }

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider
            .otherwise('/workspace');

        $stateProvider
            .state('workspace', {
                url: '/workspace',
                abstract: true,
                views: {
                    'workspaceView': {
                        templateUrl: 'src/client/app/components/workspace/workspace.html',
                        onEnter: function () {
                            console.log("You are in WORKSPACE");
                        }
                    }
                }
            });
    }
})();
