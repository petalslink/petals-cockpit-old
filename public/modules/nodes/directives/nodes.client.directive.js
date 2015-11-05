'use strict';

// Nodes directives

var nodesApp = angular.module('nodes');

// Transclusion for integration node list template html

nodesApp.directive('dirNodeList', ['Nodes',
    function (Nodes) {

        return {
            restrict: 'E',
            scope: {
                nodesList: '=info',
                searchText: '=filter'
            },
            transclude: true,
            templateUrl: '/modules/nodes/views/node-list-template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

nodesApp.directive('dirNodeUnique', ['Nodes',
    function (Nodes) {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/nodes/views/node-unique-template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

nodesApp.directive('dirNodeTree', ['Nodes',
    function (Nodes) {

        return {
            restrict: 'E',
            scope: {
                nodeName: '=info'
            },
            transclude: true,
            templateUrl: '/modules/nodes/views/node-name-tree.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

nodesApp.directive('dirSupNode', ['Nodes',
    function (Nodes) {

        return {
            restrict: 'E',
            scope: {
                node: '='
            },
            template: '<md-button class="md-fab md-accent md-hue-1" aria-label="Edit" ng-click="removeNode()"><md-tooltip>Remove {{node.name}}</md-tooltip><md-icon class="material-icons md-24 md-primary">delete</md-icon></md-button>',
            link: function ($scope, element, attrs) {
                $scope.removeNode = function() {
                    Nodes.deleteNode({nodeId: $scope.node._id}, function() {
                        console.log($scope.node.name, $scope.node.version, $scope.node._id, 'has been deleted !');
                    });
                };
            }
        };
    }
]);

nodesApp.directive('dirUpNode', ['Nodes',
    function (Nodes) {

        return {
            restrict: 'E',
            scope: {
                node: '='
            },
            template: '<md-button class="md-fab md-accent md-hue-1" aria-label="Edit" ng-click="updNode()"><md-tooltip>Edit {{node.name}}</md-tooltip><md-icon class="material-icons md-24 md-primary">edit</md-icon></md-button>',
            link: function ($scope, element, attrs) {
                $scope.updNode = function() {

                };
            }
        };
    }
]);
