(function () {
    'use strict';

    var configBcMail = angular.module('app.configBcMail');

    var runFuntion = runFunction;

    configBcMail.config(configFunction);
    configBcMail.run(runFuntion);

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
            .state('workspace.petals.bc-mail.config', {
                url: '/config',
                sticky: true,
                dsr: true,
                views: {
                    'petals-console': {
                        controller: 'ConfigBcMailController',
                        templateUrl: 'src/client/app/petals-component/bc-mail/bc-mail-config/bc-mail-config.html',
                        onEnter: function () {
                            console.log("You are in CONFIG BC-MAIL");
                        }
                    }
                }
            })

    }
})();
