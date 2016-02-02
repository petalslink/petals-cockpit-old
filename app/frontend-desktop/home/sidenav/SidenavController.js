'use strict';

function SidenavCtrl($scope, $mdSidenav, $timeout, $log) {

    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.lockLeft = true;
    $scope.isOpenRight = function() {
        return $mdSidenav('right').isOpen();
    };
    $scope.isOpenLeft = function() {
        return $mdSidenav('left').isOpen();
    };

    $scope.isOpenNavWorkspaceLeft = function() {
        return $mdSidenav('left').isOpen();
    };

    $scope.close = function() {
        $mdSidenav('right').close()
            .then(function () {
                $log.debug("close RIGHT is done");
            });
    };

/*    $scope.close = function() {
        $mdSidenav('left').close()
            .then(function() {
                $log.debug("close LEFT is done");
            });
    };*/

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

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;
        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }


    function buildToggler(navID) {
        return function () {
            $mdSidenav(navID)
                .toggle()
                .then(function() {
                    $log.debug("toggle " + navID + " is done");
                });
        }
    }
}

SidenavCtrl.$inject = ['$scope','$mdSidenav', '$timeout', '$log'];
module.exports = SidenavCtrl;