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
            template: '<md-button class="md-fab md-mini md-accent md-hue-1" aria-label="Edit" ng-click="removeService()"><md-tooltip>Remove {{service.name}}</md-tooltip><md-icon class="material-icons md-24 md-primary">delete</md-icon></md-button>',
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
            template: '<md-button class="md-fab md-mini md-accent md-hue-1" aria-label="Edit" ng-click="updService()"><md-tooltip>Edit {{service.name}}</md-tooltip><md-icon class="material-icons md-24 md-primary">edit</md-icon></md-button>',
            link: function ($scope, element, attrs) {
                $scope.updService = function() {

                };
            }
        };
    }
]);

servicesApp.directive('dirServiceUniqueUp', ['Services',
    function (Services) {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/services/views/configuration-edit-service.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

