'use strict';

// Nodes directives

var nodesApp = angular.module('nodes');

<!-- FOR SEE OVERVIEW SETTINGS NODES SELECTED -->
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

<!-- FOR UPDATE NODE SELECTED -->
nodesApp.directive('dirNodeUniqueUp', ['Nodes',
    function (Nodes) {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/nodes/views/configuration-edit-node.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

/*
nodesApp.directive('dirSupNode', ['Nodes',
    function (Nodes) {

        return {
            restrict: 'E',
            scope: {
                node: '='
            },
            template: '<md-button class="md-fab md-mini md-accent md-hue-1" aria-label="Edit" ng-click="removeNode()"><md-tooltip>Remove {{node.name}}</md-tooltip><md-icon class="material-icons md-24 md-primary">delete</md-icon></md-button>',
            link: function ($scope, element, attrs) {
                $scope.removeNode = function() {
                    Nodes.deleteNode({nodeId: $scope.node._id}, function() {
                        console.log($scope.node.name, $scope.node.version, $scope.node._id, 'has been deleted !');
                    });
                };
            }
        };
    }
]);*/