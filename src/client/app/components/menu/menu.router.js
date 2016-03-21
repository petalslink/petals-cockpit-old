(function () {
    'use strict';

    var menu = angular.module('app.menu');

    var runFuntion = runFuntion;

    menu.config(configFunction);
    menu.run(runFuntion);

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

/*        $urlRouterProvider
            .otherwise('/workspace/apptabs');

        $stateProvider
            .state('workspace.apptabs', {
                url: '',
                views: {
                    'apptabsView': {
                        templateUrl: 'src/client/app/components/apptabs/apptabs.html',
                        controller: 'ApptabsController',
                        onEnter: function () {
                            console.log("You are in APPTABS");
                        }
                    }
                }
            });*/
    }
})();
