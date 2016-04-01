(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('tmplConsole', directiveFunction)
        .controller('ConsoleController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'src/client/app/layout/console.html',
            scope: {
            },
            controller: 'ConsoleController',
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