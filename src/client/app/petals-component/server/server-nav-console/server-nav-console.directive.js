(function () {
    'use strict';

    angular
        .module('app.nav-consoleServer')
        .directive('tmplNavConsoleServer', directiveFunction)
        .controller('NavConsoleServerController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/petals/server/server-nav-console/server-nav-console.html',
            scope: {
            },
            controller: 'NavConsoleServerController',
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

            operationLocked: false,
            operationLabel: 'Operation',
            operationIcon: 'details',

            configLocked: false,
            configLabel: 'Config',
            configIcon: 'settings'

        };
    }

})();
