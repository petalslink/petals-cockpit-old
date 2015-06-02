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

busesApp.directive('dirSupBus', ['Buses',
    function (Buses) {

        return {
            restrict: 'E',
            scope: {
                bus: '='
            },
            template: '<button class="btn btn-danger" type="button" ng-click="removeBus()"><i class="glyphicon glyphicon-trash"></i></button>',
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
            template: '<button class="btn btn-success" type="button" ng-click="updBus()"><i class="glyphicon glyphicon-pencil"></i></button>',
            link: function ($scope, element, attrs) {
                $scope.updBus = function() {

                };
            }
        };
    }
]);
