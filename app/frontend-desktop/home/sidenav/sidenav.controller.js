(function () {
    'use strict';

    angular
        .module('frontend-desktop.home.sidenav', [])
        .controller('SidenavController', SidenavController);

    SidenavController.$inject = ['$scope', '$mdSidenav', '$log'];

    function SidenavController($scope, $mdSidenav, $log) {

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


            /* Position Toolbar Tab on Top when it's false */
            bottom: false
        };

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