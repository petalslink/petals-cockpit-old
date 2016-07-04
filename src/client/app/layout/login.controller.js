(function () {
    'use strict';

    angular.module('app.layout')
        .controller('AuthController', AuthControllerFunction);

    // ----- AuthControllerFunction -----
    AuthControllerFunction.$inject = ['$state', 'AUTH_EVENTS', 'AuthService', '$rootScope'];

    /* @ngInject */
    function AuthControllerFunction($state, AUTH_EVENTS, AuthService, $rootScope) {
        var vm = this;

        vm.credentials = {
            username: '',
            password: ''
        };

        vm.login = function (credentials) {
            AuthService.postLogin(credentials).then(function (user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $rootScope.setCurrentUser(user);
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };

        vm.reloadWorkspace = reloadWorkspace;

        function reloadWorkspace() {
            $state.go('home.workspace', {}, {reload: true});
        }
    }

})();
