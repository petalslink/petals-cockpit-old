(function () {

    'use strict';

    angular.module('app.bus')
        .controller('BusController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope'];

    /* @ngInject */
    function ControllerFunction($scope) {

        activate();



        $scope.dataNavMenu = {
            menuLocked: false,
            menuLabel: 'Menu',
            menuIcon: 'menu'
        };

        // TABS VIEWS CONSOLE
        $scope.dataNavConsole = [
            {
                Locked: false,
                Label: 'Overview',
                Icon: 'remove_red_eye',
                UiSref: '.overview'
            },
            {
                Locked: false,
                Label: 'Config',
                Icon: 'settings',
                UiSref: '.config'

            }
        ];

        function activate() {
            //$scope.$state.go('.overview');
        }
    }

})();
