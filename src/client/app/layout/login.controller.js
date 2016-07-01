(function () {
    'use strict';

    angular.module('app.layout')
        .controller('AuthController', AuthControllerFunction);

    // ----- AuthControllerFunction -----
    AuthControllerFunction.$inject = ['$state', '$http', '$rootScope', '$location', 'logger'];

    /* @ngInject */
    function AuthControllerFunction($state, $http, $rootScope, $location, logger) {
        var vm = this;

        vm.user = {username: '', password: ''};
        vm.error_message = '';

        vm.login = function (credentials) {
            $http.post('/api/login', credentials).then(
                function () {
                    $rootScope.authenticated = true;
                    $rootScope.current_user = credentials.username;
                    $location.path('/workspace/petals');
                    logger.success('You are logged with ' + '"' + credentials.username + '"');
                },
                function (data) {
                    vm.error_message = data.message;
                    logger.error('Login is refused !');
                });
        };

        vm.reloadWorkspace = reloadWorkspace;

        function reloadWorkspace() {
            $state.go('home.workspace', {}, {reload: true});
        }
    }

})();
