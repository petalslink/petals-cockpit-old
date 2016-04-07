(function () {
    'use strict';

    var configSePojo = angular.module('app.configSePojo');

    var runFuntion = runFunction;

    configSePojo.config(configFunction);
    configSePojo.run(runFuntion);

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
            .state('workspace.petals.se-pojo.config', {
                url: '/config',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'ConfigSePojoController',
                        templateUrl: 'src/client/app/petals-component/se-pojo/se-pojo-config/se-pojo-config.html',
                        onEnter: function () {
                            console.log("You are in CONFIG SE-POJO");
                        }
                    }
                }
            })

    }
})();
