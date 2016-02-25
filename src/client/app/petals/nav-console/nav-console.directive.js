(function () {
    'use strict';

    angular
        .module('app.nav-console')
        .directive('tmplNavConsole', directiveFunction)
        .controller('NavConsoleController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/petals/nav-console/nav-console.html',
            scope: {
            },
            controller: 'NavConsoleController',
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

            adminLocked: false,
            adminLabel: 'Operation',
            adminIcon: 'details',

            monitorLocked: false,
            monitorLabel: 'Monitor',
            monitorIcon: 'build',

            configLocked: false,
            configLabel: 'Config',
            configIcon: 'settings',

            logLocked: false,
            logLabel: 'Log',
            logIcon: 'security',

            flowLocked: false,
            flowLabel: 'Flow',
            flowIcon: 'trending_up',

            userLocked: false,
            userLabel: 'User',
            userIcon: 'verified_user',


            /* Position Toolbar Tab on Top when it's false */
            bottom: false
        };

        $scope.nextNav = function () {
            $scope.dataNavConsole.selectedIndex = Math.min($scope.dataNavConsole.selectedIndex + 1, 2, 3, 4, 5, 6, 7);
        };
        $scope.previousNav = function () {
            $scope.dataNavConsole.selectedIndex = Math.max($scope.dataNavConsole.selectedIndex - 1, 0);
        };
    }

})();
