'use strict';

// Customers directives

var customersApp = angular.module('customers');

// Transclusion for integration customer list template html
customersApp.directive('customerList', ['Customers', 'Notify',
    function(Customers, Notify) {

    return {
        restrict: 'E',
        transclude: true,
        templateUrl: '/modules/customers/views/customer-list-template.html',
        link: function($scope, element, attrs){

            //when a new customer is added, update the customer list

            Notify.getMsg('NewCustomer', function(event, data) {

                $scope.customersCtrl.customers = Customers.query();

            });
        }
    };
}]);