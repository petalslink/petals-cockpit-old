(function () {
    'use strict';

    angular.module('app.layout')
        .controller('AuthController', AuthControllerFunction);

    // ----- AuthControllerFunction -----
    AuthControllerFunction.$inject = ['$state', '$http', '$rootScope', '$location'];

    /* @ngInject */
    function AuthControllerFunction($state, $http, $rootScope, $location) {
        var vm = this;
        vm.user = {username: '', password: ''};
        vm.error_message = '';

        vm.login = function (credentials) {
            $http.post('/api/login', credentials).then(
                function () {
                    $rootScope.authenticated = true;
                    $rootScope.current_user = credentials.username;
                    $location.path('/');
                },
                function (data) {
                    vm.error_message = data.message;
                });
        };

        vm.reloadWorkspace = reloadWorkspace;

        function reloadWorkspace() {
            $state.go('home.workspace', {}, {reload: true});

        }
    }

})();
