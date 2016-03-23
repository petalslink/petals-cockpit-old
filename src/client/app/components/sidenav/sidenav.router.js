(function () {
    'use strict';

    var sidenav = angular.module('app.sidenav');

    sidenav.config(configFunction);
    sidenav.run(runFuntion);

    runFunction.$inject = ['$rootScope', '$state', '$stateParams', '$anchorScroll'];

    /* @ngInject */
    function runFunction($rootScope, $state, $stateParams) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    configFunction.$inject = ['$locationProvider', '$uiViewScrollProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

    }
})();
