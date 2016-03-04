(function () {
    'use strict';

    angular
        .module('app.overviewBus')
        .directive('tmplOverviewBus', directiveFunction)
        .controller('OverviewBusController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/petals/bus/overview/overview.html',
            scope: {
            },
            controller: 'OverviewBusController',
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
