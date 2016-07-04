(function () {
    'use strict';

    var core = angular.module('app.core')
        .factory('AuthInterceptor', AuthInterceptor);

    var runFuntion = runFunction;

    core.config(configFunction);
    core.run(runFuntion);

    runFunction.$inject = ['$rootScope', '$location', '$state', '$stateParams', '$urlRouter', 'logger',
        '$http', 'AUTH_EVENTS', 'AuthService', 'USER_ROLES'];

    /* @ngInject */
    function runFunction($rootScope, $location, $state, $stateParams, $urlRouter, logger, $http,
                         AUTH_EVENTS, AuthService, USER_ROLES) {
        $rootScope.$location = $location;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // usable for checks in html
        $rootScope.userRoles = USER_ROLES;
        $rootScope.isAuthorized = AuthService.isAuthorized;
        $rootScope.isAuthenticated = AuthService.isAuthenticated;

        $rootScope.current_user = null;
        $rootScope.setCurrentUser = function (user) {
            $rootScope.currentUser = user;
        };

        $rootScope.$on('$stateChangeStart', function (event, next) {
            if (next.data !== undefined && !AuthService.isAuthorized(next.data.authorizedRoles)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }
        });

        $rootScope.logout = function(){
            $http.get('/api/logout');
            $location.path('/login');
            logger.success('Bye Bye ');
        };

        /* todo manage resolve error on state transition */
        $rootScope.$on('$stateChangeError', function (event) {
            logger.debug('*** Core.router.js $on:');
            logger.debug('  ------> event        : ' + angular.toJson(event));
        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            logger.debug('*** Core.router.js $on:');
            logger.debug('  ------> event        : ' + angular.toJson(event));
            logger.debug('  ------> unfoundState.to : ' + angular.toJson(unfoundState.to));
            logger.debug('  ------> unfoundState.toParams : ' + angular.toJson(unfoundState.toParams));
            logger.debug('  ------> unfoundState.options : ' + unfoundState.options);
            logger.debug('  ------> fromState    : ' + angular.toJson(fromState));
            logger.debug('  ------> fromParams   : ' + angular.toJson(fromParams));
            // this is required if you want to prevent the $UrlRouter
            // reverting the URL to the previous valid location
            event.preventDefault();
        });
        // Configures $urlRouter's listener *after* your custom listener
        $urlRouter.listen();
    }

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

        $urlRouterProvider.deferIntercept();

        $locationProvider.html5Mode({enabled:true,requireBase:true});

        $urlRouterProvider.when('/', '/login');

        $urlRouterProvider.otherwise('/404');

        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);

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
                url: '/',
                sticky: true,
                dsr: true,
                template: '<ui-view layout="column" layout-fill flex></ui-view>',
                controller: '',
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in HOME');
                }]
            })
            .state('login', {
                url: '/login',
                sticky: true,
                dsr: true,
                views: {
                    '': {
                        templateUrl: 'src/client/app/layout/login.html',
                        controller: 'AuthController',
                        controllerAs: 'vm'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in Login Page');
                }]
            });
    }

    // ----- AuthInterceptor -----
    AuthInterceptor.$inject = ['$rootScope', '$q', 'AUTH_EVENTS'];

    /* @ngInject */
    function AuthInterceptor($rootScope, $q, AUTH_EVENTS) {

        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status], response);
                return $q.reject(response);
            }
        };
    }

})();
