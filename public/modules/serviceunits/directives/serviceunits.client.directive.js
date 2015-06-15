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
            scope: {
                serviceunitUnique: '=info'
            },
            transclude: true,
            templateUrl: '/modules/serviceunits/views/serviceunit-unique-template.html',
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
            template: '<button class="btn btn-danger" type="button" ng-click="removeServiceunit()"><i class="glyphicon glyphicon-trash"></i></button>',
            link: function ($scope, element, attrs) {
                $scope.removeServiceunit = function() {
                    Serviceunits.deleteServiceunit({serviceunitId: $scope.serviceunit._id}, function() {
                        console.log($scope.serviceunit.name, $scope.serviceunit.version, $scope.serviceunit._id, 'has been deleted !');
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
            template: '<button class="btn btn-success" type="button" ng-click="updServiceunit()"><i class="glyphicon glyphicon-pencil"></i></button>',
            link: function ($scope, element, attrs) {
                $scope.updServiceunit = function() {

                };
            }
        };
    }
]);
