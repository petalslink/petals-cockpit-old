(function () {
    'use strict';

    angular
        .module('app.operationServer')
        .directive('tmplOperationServer', directiveFunction)
        .controller('OperationServerController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/petals/server/server-operation/server-operation.html',
            scope: {
            },
            controller: 'OperationServerController',
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
