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
            templateUrl: 'app/petals/bus/bus-nav-console/bus-nav-console.html',
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

            menuLocked: false,
            menuLabel: 'Menu',
            menuIcon: 'menu',

            overviewLocked: false,
            overviewLabel: 'Overview',
            overviewIcon: 'remove_red_eye',

            configLocked: false,
            configLabel: 'Config',
            configIcon: 'settings'

        };
    }

})();
