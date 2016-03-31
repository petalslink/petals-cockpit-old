(function () {
    'use strict';

    var service = angular.module('app.service');

    var runFuntion = runFunction;

    service.config(configFunction);
    service.run(runFuntion);

    runFunction.$inject = ['$rootScope', '$state', '$stateParams'];

    /* @ngInject */
    function runFunction($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    configFunction.$inject = ['$locationProvider', '$stickyStateProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stickyStateProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider
            .otherwise('/workspace');

        $stateProvider
            .state('workspace.service', {
                url: '/service',
                sticky: true,
                dsr: true,
                views: {
                    'service-sidenav': {
                        templateUrl: 'src/client/app/workspace/service/service.html',
                        controller: 'ServiceController',
                        onEnter: function () {
                            console.log("You are in SERVICE");
                        }
                    },
                    'service-nav-console': {
                        template: '<h1>THIS IS NAV SERVICE</h1>',
                        controller: '',
                        onEnter: function () {
                            console.log("You are in NAV");
                        }
                    },
                    'service-console': {
                        template: '<h1>THIS IS CONSOLE SERVICE</h1>',
                        controller: '',
                        onEnter: function () {
                            console.log("You are in CONSOLE");
                        }
                    }
                }
            });

        $stickyStateProvider.enableDebug(true);
    }
})();
