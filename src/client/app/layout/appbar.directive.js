(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('tmplAppbar', directiveFunction)
        .controller('LoginController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'src/client/app/layout/appbar.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----

    ControllerFunction.$inject = ['$state'];

    /* @ngInject */
    function ControllerFunction($state) {
        var vm = this;
/*        vm.login = login;*/
        vm.reloadWorkspace = reloadWorkspace;
        vm.username = null;
        vm.password = null;
        vm.cbRemember = true;

/*        function login() {
            $mdDialog.show({
                templateUrl: 'src/client/app/layout/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            });
        }*/

        function reloadWorkspace() {
            $state.go('home.workspace',{},{reload: true} );

        }
    }

})();
