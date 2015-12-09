'use strict';

// Service Units directives

var serviceunitsApp = angular.module('serviceunits');

<!-- FOR SEE OVERVIEW SETTINGS SERVICE UNIT SELECTED -->
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

<!-- FOR UPDATE SERVICE UNIT SELECTED -->
serviceunitsApp.directive('dirServiceunitUniqueUp', ['Serviceunits',
    function (Serviceunits) {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/serviceunits/views/configuration-edit-su.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
]);

/*
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
]);*/
