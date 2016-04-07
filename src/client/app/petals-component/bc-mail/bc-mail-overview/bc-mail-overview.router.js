(function () {
    'use strict';

    var overviewBcMail = angular.module('app.overviewBcMail');

    var runFuntion = runFunction;

    overviewBcMail.config(configFunction);
    overviewBcMail.run(runFuntion);

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
            .state('workspace.petals.bc-mail.overview', {
                url: '/overview',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'OverviewBcMailController',
                        templateUrl: 'src/client/app/petals-component/bc-mail/bc-mail-overview/bc-mail-overview.html',
                        onEnter: function () {
                            console.log("You are in OVERVIEW BC-MAIL");
                        }
                    }
                }
            })

    }
})();
