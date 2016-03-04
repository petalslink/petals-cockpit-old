(function () {
    'use strict';

    angular
        .module('app.configBus')
        .directive('tmplConfigBus', directiveFunction)
        .controller('ConfigBusController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/petals/bus/config/config.html',
            scope: {
            },
            controller: 'ConfigBusController',
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
