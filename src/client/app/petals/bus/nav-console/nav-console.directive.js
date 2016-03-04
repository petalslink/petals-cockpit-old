(function () {
    'use strict';

    angular
        .module('app.nav-consoleBus')
        .directive('tmplNavConsoleBus', directiveFunction)
        .controller('NavConsoleBusController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/petals/bus/nav-console/nav-console.html',
            scope: {
            },
            controller: 'NavConsoleBusController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope'];

    /* @ngInject */
    function ControllerFunction($scope) {

        // TABS VIEWS CONSOLE
        $scope.dataNavConsole = {

            selectedIndex: 0,

            overviewLocked: false,
            overviewLabel: 'Overview',
            overviewIcon: 'remove_red_eye',

            configLocked: false,
            configLabel: 'Config',
            configIcon: 'settings',

            /* Position Toolbar Tab on Top when it's false */
            bottom: false
        };

        $scope.nextNav = function () {
            $scope.dataNavConsole.selectedIndex = Math.min($scope.dataNavConsole.selectedIndex + 1, 2);
        };
        $scope.previousNav = function () {
            $scope.dataNavConsole.selectedIndex = Math.max($scope.dataNavConsole.selectedIndex - 1, 0);
        };
    }

})();
