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
            $scope.dataNav.selectedIndex = Math.min($scope.dataNav.selectedIndex + 1, 2, 3);
        };
        $scope.previousNav = function () {
            $scope.dataNav.selectedIndex = Math.max($scope.dataNav.selectedIndex - 1, 0);
        };
    }

})();
