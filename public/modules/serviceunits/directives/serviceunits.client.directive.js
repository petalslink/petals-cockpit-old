'use strict';

// Service Units directives

var serviceunitsApp = angular.module('serviceunits');

// Transclusion for integration service unit list template html

serviceunitsApp.directive('dirServiceunitList', ['Serviceunits',
    function (Serviceunits) {

        return {
            restrict: 'E',
            scope: {
                serviceunitsList: '=info',
                searchText: '=filter'
            },
            transclude: true,
            templateUrl: '/modules/serviceunits/views/serviceunit-list-template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

serviceunitsApp.directive('dirServiceunitUnique', ['Serviceunits',
    function (Serviceunits) {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/serviceunits/views/serviceunit-unique-template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

serviceunitsApp.directive('dirServiceunitTree', ['Serviceunits',
    function (Serviceunits) {

        return {
            restrict: 'E',
            scope: {
                serviceunitName: '=info'
            },
            transclude: true,
            templateUrl: '/modules/serviceunits/views/serviceunit-name-tree.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);


serviceunitsApp.directive('dirSupServiceunit', ['Serviceunits',
    function (Serviceunits) {

        return {
            restrict: 'E',
            scope: {
                serviceunit: '='
            },
            template: '<md-button class="md-fab md-mini md-accent md-hue-1" aria-label="Edit" ng-click="removeServiceunit()"><md-tooltip>Remove {{serviceunit.name}}</md-tooltip><md-icon class="material-icons md-24 md-primary">delete</md-icon></md-button>',
            link: function ($scope, element, attrs) {
                $scope.removeServiceunit = function() {
                    Serviceunits.deleteServiceunit({serviceunitId: $scope.serviceunit._id}, function() {
                        console.log($scope.serviceunit.name, $scope.serviceunit.states, 'has been deleted !');
                    });
                };
            }
        };
    }
]);

serviceunitsApp.directive('dirUpServiceunit', ['Serviceunits',
    function (Serviceunits) {

        return {
            restrict: 'E',
            scope: {
                serviceunit: '='
            },
            template: '<md-button class="md-fab md-mini md-accent md-hue-1" aria-label="Edit" ng-click="updServiceunit()"><md-tooltip>Edit {{serviceunit.name}}</md-tooltip><md-icon class="material-icons md-24 md-primary">edit</md-icon></md-button>',
            link: function ($scope, element, attrs) {
                $scope.updServiceunit = function() {

                };
            }
        };
    }
]);
