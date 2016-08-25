(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('AuthService', AuthService)
        .service('SessionService', SessionService);

    AuthService.$inject = ['$http', 'logger', 'SessionService'];

    /* @ngInject */
    function AuthService($http, logger, Session) {

        var auth = $http.get('/api/session').then(
            function (res) {
                Session.create(res.data.username, res.data.roles);
            },
            function () {
                Session.destroy();
            });

        var AuthService = {
            ready: auth,
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized
        };

        return AuthService;

        function login(credentials) {
            return $http.post('/api/session', credentials).then(
                function (res) {
                    Session.create(res.data.username, res.data.roles);
                    logger.success('You are logged with ' + '"' + res.data.username + '"');
                });
        }

        function logout() {
            return $http.delete('/api/session').then(
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
