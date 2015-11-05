'use strict';

// Buses directives

var busesApp = angular.module('buses');

// Transclusion for integration bus list template html

busesApp.directive('dirBusList', ['Buses',
    function (Buses) {

        return {
            restrict: 'E',
            scope: {
                busesList: '=info',
                searchText: '=filter'
            },
            transclude: true,
            templateUrl: '/modules/buses/views/bus-list-template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

busesApp.directive('dirBusUnique', ['Buses',
    function (Buses) {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/buses/views/bus-unique-template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

busesApp.directive('dirSupBus', ['Buses',
    function (Buses) {

        return {
            restrict: 'E',
            scope: {
                bus: '='
            },
            template: '<md-button class="md-fab md-accent md-hue-1" aria-label="Edit" ng-click="removeBus()"><md-tooltip>Remove {{bus.name}}</md-tooltip><md-icon class="material-icons md-24 md-primary">delete</md-icon></md-button>',
            link: function ($scope, element, attrs) {
                $scope.removeBus = function() {
                    Buses.deleteBus({busId: $scope.bus._id}, function() {
                        console.log($scope.bus.name, $scope.bus.version, $scope.bus._id, 'has been deleted !');
                    });
                };
            }
        };
    }
]);

busesApp.directive('dirUpBus', ['Buses',
    function (Buses) {

        return {
            restrict: 'E',
            scope: {
                bus: '='
            },
            template: '<md-button class="md-fab md-accent md-hue-1" aria-label="Edit" ng-click="updBus()"><md-tooltip>Edit {{bus.name}}</md-tooltip><md-icon class="material-icons md-24 md-primary">edit</md-icon></md-button>',
            link: function ($scope, element, attrs) {
                $scope.updBus = function() {

                };
            }
        };
    }
]);
