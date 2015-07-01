'use strict';

// Components directives

var componentsApp = angular.module('components');

// Transclusion for integration component list template html

componentsApp.directive('dirComponentList', ['Components',
    function (Components) {

        return {
            restrict: 'E',
            scope: {
                componentsList: '=info',
                searchText: '=filter'
            },
            transclude: true,
            templateUrl: '/modules/components/views/component-list-template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

componentsApp.directive('dirComponentUnique', ['Components',
    function (Components) {

        return {
            restrict: 'E',
            scope: {
                componentUnique: '=info'
            },
            transclude: true,
            templateUrl: '/modules/components/views/component-unique-template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

componentsApp.directive('dirCompoTree', ['Components',
    function (Components) {

        return {
            restrict: 'E',
            scope: {
                componentName: '=info'
            },
            transclude: true,
            templateUrl: '/modules/components/views/component-name-tree.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

componentsApp.directive('dirSupComponent', ['Components',
    function (Components) {

        return {
            restrict: 'E',
            scope: {
                component: '='
            },
            template: '<button class="btn btn-danger" type="button" ng-click="removeComponent()"><i class="glyphicon glyphicon-trash"></i></button>',
            link: function ($scope, element, attrs) {
                $scope.removeComponent = function() {
                    Components.deleteComponent({componentId: $scope.component._id}, function() {
                        console.log($scope.component.name,'has been deleted !');
                    });
                };
            }
        };
    }
]);

componentsApp.directive('dirUpComponent', ['Components',
    function (Components) {

        return {
            restrict: 'E',
            scope: {
                component: '='
            },
            template: '<button class="btn btn-success" type="button" ng-click="updComponent()"><i class="glyphicon glyphicon-pencil"></i></button>',
            link: function ($scope, element, attrs) {
                $scope.updComponent = function() {

                };
            }
        };
    }
]);
