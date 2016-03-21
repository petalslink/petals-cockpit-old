(function () {
    'use strict';

    var sidenav = angular.module('app.sidenav');

    sidenav.config(configFunction);
    sidenav.run(runFuntion);

    runFunction.$inject = ['$rootScope', '$state', '$stateParams', '$anchorScroll'];

    /* @ngInject */
    function runFunction($rootScope, $state, $stateParams, $anchorScroll) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            if ($stateParams.scrollTo) {
                $location.hash($stateParams.scrollTo);
                $anchorScroll();
            }

        });
    }

    configFunction.$inject = ['$locationProvider', '$uiViewScrollProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $uiViewScrollProvider, $stateProvider, $urlRouterProvider) {

        $uiViewScrollProvider.useAnchorScroll();

        $locationProvider.html5Mode(true);

/*        $urlRouterProvider
            .otherwise('/workspace/apptabs/sidenav');

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
            });*/
    }
})();
