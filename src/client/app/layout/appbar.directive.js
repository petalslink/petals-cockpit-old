(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('tmplAppbar', directiveFunction)
        .controller('AppbarController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'src/client/app/layout/appbar.html',
            scope: {
            },
            controller: 'AppbarController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$state', '$mdDialog'];

    /* @ngInject */
    function ControllerFunction($state, $mdDialog) {
        var vm = this;
        vm.login = login;
        vm.reloadWorkspace = reloadWorkspace;

        function login() {
            $mdDialog.show({
                templateUrl: 'src/client/app/layout/login-dialog.html',
                controller: 'LoginDialogController',
                controllerAs: 'vm'
            });
        }

        function reloadWorkspace() {
            $state.go('home.workspace',{},{reload: true} );

        }
    }

})();
