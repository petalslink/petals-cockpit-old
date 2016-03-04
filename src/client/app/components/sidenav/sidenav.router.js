(function () {
    'use strict';

    var sidenav = angular.module('app.sidenav');

    sidenav.config(configFunction);
    sidenav.run(runFuntion);

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
            .state('workspace.apptabs.sidenav', {
                url: '/sidenav',
                views: {
                    'sidenavView': {
                        templateUrl: 'src/client/app/components/sidenav/sidenav.html',
                        controller: 'SidenavController',
                        onEnter: function () {
                            console.log("You are in SIDENAV");
                        }
                    }
                }
            });
    }
})();
