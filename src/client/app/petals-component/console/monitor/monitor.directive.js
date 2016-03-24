(function () {
    'use strict';

    angular
        .module('app.monitor')
        .directive('tmplMonitor', directiveFunction)
        .controller('MonitorController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/petals/console/monitor/monitor.html',
            scope: {
            },
            controller: 'MonitorController',
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
