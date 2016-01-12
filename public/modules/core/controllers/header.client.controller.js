'use strict';

var coreApp = angular.module('core');

coreApp.controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', '$timeout', '$mdSidenav', '$log',
    function ($scope, $state, Authentication, Menus, $timeout, $mdSidenav, $log) {

        //Expose view variables
        $scope.$state = $state;
        $scope.authentication = Authentication;

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function () {
            $scope.isCollapsed = false;
        });

        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.lockLeft = true;
        $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
        };
        $scope.isOpenLeft = function(){
            return $mdSidenav('left').isOpen();
        };

        $scope.isOpenNavWorkspaceLeft = function(){
            return $mdSidenav('left').isOpen();
        };

        $scope.dataNav = {

            selectedIndex: 0,

            view1Locked: false,
            view1Label: 'View 1',
            view1Icon: 'lock_open',

            view2Locked: true,
            view2Label: 'View 2',
            view2Icon: 'lock',

            view3Locked: true,
            view3Label: 'View 3',
            view3Icon: 'lock',


            /* Position Toolbar Tab on Top when it's false */
            bottom: false
        };
        $scope.nextNav = function () {
            $scope.dataNav.selectedIndex = Math.min($scope.dataNav.selectedIndex + 1, 2, 3);
        };
        $scope.previousNav = function () {
            $scope.dataNav.selectedIndex = Math.max($scope.dataNav.selectedIndex - 1, 0);
        };


        $scope.datas = {

            selectedIndex: 0,

            menuLocked: false,
            menuLabel: 'Menu',
            menuIconOpen: 'arrow_back',
            menuIconClose: 'menu',

            overviewLocked: false,
            overviewLabel: 'Overview',
            overviewIcon: 'remove_red_eye',

            adminLocked: true,
            adminLabel: 'Operation',
            adminIcon: 'details',

            monitorLocked: true,
            monitorLabel: 'Monitor',
            monitorIcon: 'build',

            configLocked: false,
            configLabel: 'Config',
            configIcon: 'settings',

            logLocked: true,
            logLabel: 'Log',
            logIcon: 'security',

            flowLocked: true,
            flowLabel: 'Flow',
            flowIcon: 'trending_up',

            userLocked: true,
            userLabel: 'User',
            userIcon: 'verified_user',

            /* Position Toolbar Tab on Top when it's false */
            bottom: false
        };
        $scope.next = function () {
            $scope.datas.selectedIndex = Math.min($scope.datas.selectedIndex + 1, 2, 3, 4, 5, 6, 7,8);
        };
        $scope.previous = function () {
            $scope.datas.selectedIndex = Math.max($scope.datas.selectedIndex - 1, 0);
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

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
/*
        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }
*/

        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }

    }]);

coreApp.config(['$mdThemingProvider', function ($mdThemingProvider) {
    $mdThemingProvider.theme('core-theme', 'default')
        .primaryPalette('orange', {
            'default': '700',
            'hue-1': '500',
            'hue-2': '300',
            'hue-3': '100'
        })
        .accentPalette('deep-purple', {
            'default': '800',
            'hue-1': '800',
            'hue-2': '300',
            'hue-3': '200'
        });
}]);

coreApp.controller('NavTreeCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        }
    });

coreApp.controller('NavWorkspaceCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });
    }
});

coreApp.controller('HeaderConfigNavCtrl', function ($mdDialog) {
    var originatorEv;
    this.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
/*    this.announceClick = function (index) {
        $mdDialog.show(
            $mdDialog.alert()
                .title('You clicked!')
                .textContent('You clicked the menu item at index ' + index)
                .ok('Nice')
                .targetEvent(originatorEv)
        );
        originatorEv = null;
    }*/
});

coreApp.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        $mdSidenav('right').close()
            .then(function () {
                $log.debug("close RIGHT is done");
            });
    }
});
