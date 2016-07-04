(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('AuthService', AuthService)
        .service('SessionService', SessionService);

    AuthService.$inject = ['$http', 'logger', '$rootScope', '$location', 'SessionService'];

    /* @ngInject */
    function AuthService($http, logger, $rootScope, $location, Session) {

        var AuthService = {
            postLogin: postLogin,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized
        };

        return AuthService;

        function postLogin(credentials) {

            $http.post('/api/login', credentials).then(
                function (res) {
                    Session.create(credentials.username, []); //res.data.id, res.data.user.id, res.data.user.role
                    $rootScope.setCurrentUser(credentials.username);
                    $location.path('/workspace/petals');
                    logger.success('You are logged with ' + '"' + credentials.username + '"');
                    return res.data.user;
                },
                function () {
                    logger.error('Login is refused !');
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

        vm.create = function (sessionId, userId, userRole) {
            vm.id = sessionId;
            vm.userId = userId;
            vm.userRole = userRole;
        };
        vm.destroy = function () {
            vm.id = null;
            vm.userId = null;
            vm.userRole = null;
        };
    }
})();
