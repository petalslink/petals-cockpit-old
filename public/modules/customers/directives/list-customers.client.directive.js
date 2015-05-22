'use strict';

// Customers directives

var customersApp = angular.module('customers');

// Transclusion for integration customer list template html
customersApp.directive('dirCustomerList', ['Customers', 'Notify',
    function (Customers, Notify) {

        return {
            restrict: 'E',
            scope: {
                customersList: '=info'
            },
            transclude: true,
            templateUrl: '/modules/customers/views/customer-list-template.html',
            link: function ($scope, element, attrs) {

                //when a new customer is added, update the customer list

                Notify.getMsg('NewCustomer', function (event, data) {

                    $scope.customersCtrl.customers = Customers.query();

                });
                $scope.removeCustomer = function (customer) {
                    Customers.deleteCustomer(customer, function () {
                        console.log('PIPO !!!');
                    });
                };
                $scope.saveCustomer = function (customer) {
                    Customers.postCustomer(customer, function () {
                        console.log('MARIO !!!');
                    });
                };
                $scope.updateCustomer = function (customer) {
                    Customers.updateCustomer(customer, function () {
                        console.log('JOJO !!!');
                    });
                };
            }
        };
    }]);