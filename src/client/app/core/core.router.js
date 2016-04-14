(function () {
    'use strict';

    var core = angular.module('app.core');
    var runFuntion = runFunction;

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
            .otherwise('/404');

        $stateProvider
            .state('404', {
                url: '/404',
                sticky: true,
                dsr: true,
                views: {
                    '': {
                        templateUrl: 'src/client/app/core/404.html',
                        controller: ''
                    }
                }
            })
            .state('404.error', {
                url: '/404',
                sticky: true,
                dsr: true,
                views: {
                    'messageError404': {
                        template: '<div ui-view="messageError404"></div>',
                        controller: ''
                    }
                }
            });
    }
})();
