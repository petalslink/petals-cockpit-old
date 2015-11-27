'use strict';

var coreApp = angular.module('core');

coreApp.controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', '$timeout', '$mdSidenav', '$log',
    function ($scope, $state, Authentication, Menus, $timeout, $mdSidenav, $log) {

        //Expose view variables
        $scope.$state = $state;
        $scope.authentication = Authentication;

        // Get the topbar menu
        $scope.menu = Menus.getMenu('topbar');

        // Toggle the menu items
        $scope.isCollapsed = false;
        $scope.toggleCollapsibleMenu = function () {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function () {
            $scope.isCollapsed = false;
        });

        $scope.toggleLeft = buildDelayedToggler('left');
        $scope.toggleNavLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenLeft = function(){
            return $mdSidenav('left').isOpen();
        };
        $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
        };

        $scope.isOpenNavWorkspaceLeft = function(){
            return $mdSidenav('left').isOpen();
        };

        $scope.datas = {

            selectedIndex: 0,
            overviewLocked: false,
            overviewLabel: 'Overview',
            overviewIcon: 'remove_red_eye',

            adminLocked: false,
            adminLabel: 'Admin',
            adminIcon: 'supervisor_account',

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

            bottom: false
        };
        $scope.next = function () {
            $scope.datas.selectedIndex = Math.min($scope.datas.selectedIndex + 1, 2, 3, 4, 5, 6, 7);
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
        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }

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

/*coreApp.controller('MenuProdCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.alert = '';
    $scope.hideListMenuProd = function ($event) {
        $scope.alert = '';
        $mdSidenav.hide({
            templateUrl: '/modules/core/views/prod-list-template.html',
            controller: 'ListWorkspaceCtrl',
            targetEvent: $event
        }).then(function (close) {
            $scope.close = function () {
                $mdSidenav('left').close()
                    .then(function () {
                        $log.debug("close LEFT is done");
                    });
            }
        })
    };

    $scope.showListMenuProd = function ($event) {
        $scope.alert = '';
        $mdSidenav.show({
            templateUrl: '/modules/core/views/prod-list-template.html',
            controller: 'ListWorkspaceCtrl',
            targetEvent: $event
        }).then(function (clickedItem) {
            $scope.alert = clickedItem['name'] + ' selected!';
        });
    };
});
coreApp.controller('ListWorkspaceCtrl', function ($scope, $mdSidenav) {
    $scope.items = [
        {name: 'New ESB', icon: 'device_hub' +
        ''},
        {name: 'New Registry', icon: 'folder'},
        {name: 'New Log', icon: 'vpn_key'},
        {name: 'Workspace', icon: 'cloud'},
        {name: 'Export', icon: 'file_upload'},
        {name: 'Import', icon: 'file_download'}
    ];
    $scope.listItemClick = function ($index) {
        var clickedItem = $scope.items[$index];
        $mdSidenav.hide(clickedItem);
    };
});*/

coreApp.config(['$mdThemingProvider', function ($mdThemingProvider) {
    $mdThemingProvider.theme('core-theme', 'default')
        .primaryPalette('light-blue', {
            'default': '500',
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

coreApp.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
/*    $scope.items = [
        {name: 'New ESB', icon: 'device_hub' +
        ''},
        {name: 'New Registry', icon: 'folder'},
        {name: 'New Log', icon: 'vpn_key'},
        {name: 'Workspace', icon: 'cloud'},
        {name: 'Export', icon: 'file_upload'},
        {name: 'Import', icon: 'file_download'}
    ];*/
    $scope.close = function () {
        $mdSidenav('right').close()
            .then(function () {
                $log.debug("close RIGHT is done");
            });
    }
});
