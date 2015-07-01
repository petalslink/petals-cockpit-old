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
            scope: {
                nodeUnique: '=info'
            },
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
            template: '<button class="btn btn-danger" type="button" ng-click="removeNode()"><i class="glyphicon glyphicon-trash"></i></button>',
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
            template: '<button class="btn btn-success" type="button" ng-click="updNode()"><i class="glyphicon glyphicon-pencil"></i></button>',
            link: function ($scope, element, attrs) {
                $scope.updNode = function() {

                };
            }
        };
    }
]);
