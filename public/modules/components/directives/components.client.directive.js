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
            template: '<md-button class="md-fab md-mini md-accent md-hue-1" aria-label="Edit" ng-click="removeComponent()"><md-tooltip>Remove {{component.name}}</md-tooltip><md-icon class="material-icons md-24 md-primary">delete</md-icon></md-button>',
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
            template: '<md-button class="md-fab md-mini md-accent md-hue-1" aria-label="Edit" ng-click="updComponent()"><md-tooltip>Edit {{component.name}}</md-tooltip><md-icon class="material-icons md-24 md-primary">edit</md-icon></md-button>',
            link: function ($scope, element, attrs) {
                $scope.updComponent = function() {

                };
            }
        };
    }
]);
