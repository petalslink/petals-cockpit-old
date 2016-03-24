(function () {
    'use strict';

    angular
        .module('app.flow')
        .directive('tmplFlow', directiveFunction)
        .controller('FlowController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/petals/console/flow/flow.html',
            scope: {
            },
            controller: 'FlowController',
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
