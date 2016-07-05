(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('AuthService', AuthService)
        .service('SessionService', SessionService);

    AuthService.$inject = ['$http', 'logger', 'SessionService'];

    /* @ngInject */
    function AuthService($http, logger, Session) {

        var AuthService = {
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized
        };

        $http.get('/api/auth/status').then(
            function (res) {
                Session.create(res.data.username, res.data.roles);
            },
            function () {
                Session.destroy();
            });

        return AuthService;

        function login(credentials) {
            return $http.post('/api/auth/login', credentials).then(
                function (res) {
                    Session.create(res.data.username, res.data.roles);
                    logger.success('You are logged with ' + '"' + res.data.username + '"');
                });
        }

        function logout() {
            return $http.get('/api/auth/logout').then(
                function () {
                    Session.destroy();
                    logger.success('You are logged out');
                });
        }

        function isAuthenticated() {
            return !!Session.userId;
        }

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (isAuthenticated() &&
            authorizedRoles.indexOf(Session.userRole) !== -1);
        }

    }

    SessionService.$inject = [];

    /* @ngInject */
    function SessionService() {

        var vm = this;

        vm.create = function (userId, userRole) {
            vm.userId = userId;
            vm.userRole = userRole;
        };
        vm.destroy = function () {
            vm.userId = null;
            vm.userRole = null;
        };
    }
})();
