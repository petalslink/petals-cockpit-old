(function () {
    'use strict';

    angular
        .module('app.console')
        .directive('tmplConsole', directiveFunction)
        .controller('ConsoleController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/petals/console/console.html',
            scope: {
            },
            controller: 'ConsoleController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope'];

    /* @ngInject */
    function ControllerFunction($scope) {

    }

})();
