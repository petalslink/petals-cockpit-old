(function () {
    'use strict';

    var bcMail = angular.module('app.bc-mail');

    var runFuntion = runFunction;

    bcMail.config(configFunction);
    bcMail.run(runFuntion);

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

            .state('workspace.petals.bc-mail', {
                url: '/bc-mail',
                sticky: true,
                dsr: true,
                views: {
                    'petals-nav-console': {
                        controller: 'BcMailController',
                        templateUrl: 'src/client/app/petals-component/bc-mail/bc-mail.html',
                        onEnter: function () {
                            console.log("You are in PETALS NAV CONSOLE BC-MAIL");
                        }
                    },
                    'petals-console': {
                        template: '<div ui-view="petals-console"></div>',
                        controller: '',
                        onEnter: function () {
                            console.log("You are in PETALS CONSOLE");
                        }
                    }

                }
            })

    }
})();
