(function () {
    'use strict';

    var su = angular.module('app.su');

    var runFuntion = runFunction;

    su.config(configFunction);
    su.run(runFuntion);

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

        $stateProvider

            .state('workspace.petals.su', {
                url: '/su',
                sticky: true,
                dsr: true,
                views: {
                    'petals-nav-console@workspace': {
                        controller: 'NavConsoleSuController',
                        templateUrl: 'src/client/app/petals-component/su/su-nav-console/su-nav-console.html',
                        onEnter: function () {
                            console.log("You are in NAV CONSOLE SU");
                        }
                    }
                }
            })

    }
})();
