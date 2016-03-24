(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('tmplNavConsole', directiveFunction)
        .controller('NavConsoleController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/layout/nav-console.html',
            scope: {
            },
            controller: 'NavConsoleController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger'];

    /* @ngInject */
    function ControllerFunction(logger) {

        activate();

        function activate() {
            logger.log('Activated Petals View');
        }
    }

})();
