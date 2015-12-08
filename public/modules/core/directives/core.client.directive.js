'use strict';

var app = angular.module('core');

app.directive('dirComponentDisplay',
    function ($mdSidenav) {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/component-display.client.view.html',
            link: function ($scope, element, attrs) {
                $scope.isOpenLeft = function(){
                    /*console.log('Test !!!' + $mdSidenav('left'));*/
                    return $mdSidenav('left').isOpen();
                };
            }
        };
    }
);

app.directive('dirComponentTree',
    function () {

        return {
            restrict: 'E',
/*            scope: {
                allItems: '='
            },*/
            transclude: true,
            templateUrl: '/modules/core/views/component-tree.client.view.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);


app.directive('dirOverviewTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/overview.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirOperationTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/overview.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirMonitorTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/monitor.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirConfigTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/configuration.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirLogTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/log.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirFlowTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/flow.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirUserTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/user.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirSidenavTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/sidenav.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

/*usersApp.directive('dirUserList', ['Users', 'Notify',
    function (Users, Notify) {

        return {
            restrict: 'E',
            scope: {
                usersList: '=info',
                searchText: '=filter'
            },
            transclude: true,
            templateUrl: '/modules/users/views/user-list-template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);*/
