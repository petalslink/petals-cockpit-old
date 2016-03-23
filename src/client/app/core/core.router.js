(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(configFunction);
    core.run(runFuntion);

    runFunction.$inject = ['$rootScope', '$state', '$stateParams'];

    /* @ngInject */
    function runFunction($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('core', {
                url: '',
                abstract: true,
                views: {
                    'workspace': {
                        templateUrl: 'src/client/app/components/workspace/workspace.html',
                        onEnter: function () {
                            console.log("You are in WORKSPACE");
                        }
                    }
                }
            });
    }
})();
