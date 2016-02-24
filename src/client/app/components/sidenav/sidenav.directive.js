(function () {
    'use strict';

    angular
        .module('app.sidenav')
        .directive('tmplSidenav', directiveFunction)
        .controller('SidenavController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/sidenav/sidenav.html',
            scope: true,
            controller: 'SidenavController'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$mdSidenav', '$scope'];

    /* @ngInject */
    function ControllerFunction($mdSidenav, $scope) {

        $scope.toggleSidenav = toggleSidenav;

        function toggleSidenav() {
            $mdSidenav('left').toggle();
        }
/*
        // TABS VIEWS TREE
        $scope.dataNav = {

            selectedIndex: 0,

            view1Locked: false,
            view1Label: 'Petals',
            view1Icon: 'lock_open',

            view2Locked: false,
            view2Label: 'Service',
            view2Icon: 'lock',

            view3Locked: false,
            view3Label: 'Api',
            view3Icon: 'lock',


            /!* Position Toolbar Tab on Top when it's false *!/
            bottom: false
        };*/

        // SIDENAV

        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.lockLeft = true;
        $scope.isOpenRight = function () {
            return $mdSidenav('right').isOpen();
        };
        $scope.isOpenLeft = function () {
            return $mdSidenav('left').isOpen();
        };
        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };

        function buildToggler(navID) {
            return function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }
    }

})();
