(function () {
    'use strict';

    angular.module('app.layout')
        .controller('AuthController', AuthControllerFunction);

    // ----- AuthControllerFunction -----
    AuthControllerFunction.$inject = ['$state', 'logger', 'AUTH_EVENTS', 'AuthService', '$rootScope', '$location'];

    /* @ngInject */
    function AuthControllerFunction($state, logger, AUTH_EVENTS, AuthService, $rootScope, $location) {
        var vm = this;

        vm.credentials = {
            username: '',
            password: ''
        };

        vm.login = function (credentials) {
            AuthService.login(credentials).then(function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $location.path('/workspace/petals');
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                logger.warn('Login is refused !');
            });
        };

        vm.logout = function () {
            AuthService.logout().then(function () {
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                $location.path('/login');
            }, function () {
                logger.warn('Logout is refused !');
            });
        };

        vm.reloadWorkspace = reloadWorkspace;

        function reloadWorkspace() {
            $state.go('home.workspace', {}, {reload: true});
        }
    }

})();
