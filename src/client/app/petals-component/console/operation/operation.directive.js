(function () {
    'use strict';

    angular
        .module('app.operation')
        .directive('tmplOperation', directiveFunction)
        .controller('OperationController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/petals/console/operation/operation.html',
            scope: {
            },
            controller: 'OperationController',
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
