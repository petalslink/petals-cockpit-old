(function () {
    'use strict';

    var core = angular.module('app.core');

    var runFuntion = runFunction;

    core.config(configFunction);
    core.run(runFuntion);

    runFunction.$inject = ['$rootScope', '$location', '$state', '$stateParams', '$urlRouter', 'logger'];

    /* @ngInject */
    function runFunction($rootScope, $location, $state, $stateParams, $urlRouter, logger) {
        $rootScope.$location = $location;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

/* todo manage resolve error on state transition
        $rootScope.$on('$stateChangeError', function(event){
        }
*/
        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
            logger.debug('*** Core.router.js $on:');
            logger.debug('  ------> event        : '+angular.toJson(event));
            logger.debug('  ------> unfoundState.to : '+angular.toJson(unfoundState.to));
            logger.debug('  ------> unfoundState.toParams : '+angular.toJson(unfoundState.toParams));
            logger.debug('  ------> unfoundState.options : '+unfoundState.options);
            logger.debug('  ------> fromState    : '+angular.toJson(fromState));
            logger.debug('  ------> fromParams   : '+angular.toJson(fromParams));
            // this is required if you want to prevent the $UrlRouter
            // reverting the URL to the previous valid location
            event.preventDefault();
            });
        // Configures $urlRouter's listener *after* your custom listener
        $urlRouter.listen();
    }

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider.deferIntercept();

        $locationProvider.html5Mode({enabled:true,requireBase:true});

        $urlRouterProvider
            .otherwise('/404');

        $urlRouterProvider
            .when('/', '/workspace');

        $stateProvider
            .state('404', {
                url: '/404',
                sticky: true,
                dsr: true,
                views: {
                    '': {
                        templateUrl: 'src/client/app/core/404.html',
                        controller: ''
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in 404');
                }]
            })
            .state('home', {
                url: '',
                sticky: true,
                dsr: true,
                template: '<ui-view layout="column" layout-fill flex></ui-view>',
                controller: '',
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in HOME');
                }]
            });
    }

})();
