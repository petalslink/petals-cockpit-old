'use strict';

var app = angular.module('core');

app.directive('dirComponentDisplay',
    function () {

        return {
            restrict: 'E',
            scope: {
                object: '='
            },
            transclude: true,
            templateUrl: '/modules/core/views/component-display.client.view.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirComponentTree',
    function () {

        return {
            restrict: 'E',
            scope: {
                object: '='
            },
            transclude: true,
            templateUrl: '/modules/core/views/component-tree.client.view.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirObjectTree',
    function () {

        return {
            restrict: 'E',
            scope: {
                object: '='
            },
            transclude: true,
            templateUrl: '/modules/core/views/object-name-tree.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

