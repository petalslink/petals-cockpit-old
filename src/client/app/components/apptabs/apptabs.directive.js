(function () {
    'use strict';

    angular
        .module('app.apptabs')
        .directive('tmplApptabs', directiveFunction)
        .controller('ApptabsController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/apptabs/apptabs.html',
            scope: {
            },
            controller: 'ApptabsController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope'];

    /* @ngInject */
    function ControllerFunction($scope) {

        // TABS VIEWS TREE
        $scope.dataNav = {

            selectedIndex: 0,

            menuLocked: false,
            menuLabelOpen: 'Hide',
            menuLabelClose: 'Show',
            menuIconOpen: 'undo',
            menuIconClose: 'redo',

            petalsLocked: false,
            petalsLabel: 'Petals',
            petalsIcon: 'lock_open',

            serviceLocked: false,
            serviceLabel: 'Service',
            serviceIcon: 'lock',

            apiLocked: false,
            apiLabel: 'Api',
            apiIcon: 'lock',


            /* Position Toolbar Tab on Top when it's false */
            bottom: false
        };

        $scope.nextNav = function () {
            $scope.dataNav.selectedIndex = Math.min($scope.dataNav.selectedIndex + 1, 2, 3, 4);
        };
        $scope.previousNav = function () {
            $scope.dataNav.selectedIndex = Math.max($scope.dataNav.selectedIndex - 1, 0);
        };
    }

})();
