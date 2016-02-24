(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(configFunction);

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('dashboard', {
                url: '/app/',
                template: '<tmpl-dashboard class="page"></tmpl-dashboard>'
            })

            .state('accounts', {
                url: '/app/accounts',
                template: '<tmpl-accounts class="page"></tmpl-accounts>'
            });
    }
})();
