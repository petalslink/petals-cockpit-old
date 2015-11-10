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

        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };
        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };

        $scope.datas = {

            selectedIndex: 0,
            overviewLocked: false,
            overviewLabel: 'Overview',
            overviewIcon: 'pageview',

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
    }]);

coreApp.controller('MenuProdCtrl', function ($scope, $timeout, $mdBottomSheet) {
    $scope.alert = '';
    $scope.hideListMenuProd = function ($event) {
        $scope.alert = '';
        $mdBottomSheet.hide({
            templateUrl: '/modules/core/views/prod-list-template.html',
            controller: 'ListBottomSheetCtrl',
            targetEvent: $event
        }).then(function (close) {
            $scope.close = function () {
                $mdBottomSheet.close()
                    .then(function () {
                        $log.debug("close BOTTOM is done");
                    });
            };
        })
    };

    $scope.showListMenuProd = function ($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
            templateUrl: '/modules/core/views/prod-list-template.html',
            controller: 'ListBottomSheetCtrl',
            targetEvent: $event
        }).then(function (clickedItem) {
            $scope.alert = clickedItem['name'] + ' selected!';
        });
    };
});
coreApp.controller('ListBottomSheetCtrl', function ($scope, $mdBottomSheet) {
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
        $mdBottomSheet.hide(clickedItem);
    };
});

coreApp.config(['$mdThemingProvider', function ($mdThemingProvider) {
    $mdThemingProvider.theme('core-theme', 'default')
        .primaryPalette('deep-purple', {
            'default': '600',
            'hue-1': '400',
            'hue-2': '300',
            'hue-3': '50'
        })
        .accentPalette('amber', {
            'default': '700',
            'hue-1': '400',
            'hue-2': '300',
            'hue-3': '200'
        });
}]);