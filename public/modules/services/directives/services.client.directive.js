'use strict';

// Services directives

var servicesApp = angular.module('services');

// Transclusion for integration service list template html

servicesApp.directive('dirServiceList', ['Services',
    function (Services) {

        return {
            restrict: 'E',
            scope: {
                servicesList: '=info',
                searchText: '=filter'
            },
            transclude: true,
            templateUrl: '/modules/services/views/service-list-template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

servicesApp.directive('dirServiceUnique', ['Services',
    function (Services) {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/services/views/service-unique-template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

servicesApp.directive('dirServiceTree', ['Services',
    function (Services) {

        return {
            restrict: 'E',
            scope: {
                serviceName: '=info'
            },
            transclude: true,
            templateUrl: '/modules/services/views/service-name-tree.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

servicesApp.directive('dirSupService', ['Services',
    function (Services) {

        return {
            restrict: 'E',
            scope: {
                service: '='
            },
            template: '<button class="btn btn-danger" type="button" ng-click="removeService()"><i class="glyphicon glyphicon-trash"></i></button>',
            link: function ($scope, element, attrs) {
                $scope.removeService = function() {
                    Services.deleteService({serviceId: $scope.service._id}, function() {
                        console.log($scope.service.name, 'has been deleted !');
                    });
                };
            }
        };
    }
]);

servicesApp.directive('dirUpService', ['Services',
    function (Services) {

        return {
            restrict: 'E',
            scope: {
                service: '='
            },
            template: '<button class="btn btn-success" type="button" ng-click="updService()"><i class="glyphicon glyphicon-pencil"></i></button>',
            link: function ($scope, element, attrs) {
                $scope.updService = function() {

                };
            }
        };
    }
]);
