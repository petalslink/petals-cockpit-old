'use strict';

// Customers controller

var customersApp = angular.module('customers');

customersApp.controller('CustomersController', ['$scope', '$stateParams', 'Authentication', 'Customers', '$modal', '$log',
	function($scope, $stateParams, Authentication, Customers, $modal, $log) {

		this.authentication = Authentication;

		// Find a list of Customers
		this.customers = Customers.query();

		//*******************************************************************************************************************************************
		// Open a modal window to Create a single customer record
		this.modalCreate = function (size, createCustomerForm) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/customers/views/create-customer.client.view.html',
				controller: function ($scope, $modalInstance) {

					$scope.ok = function(){
						if(createCustomerForm.$valid){
							$log.info('Form is valid');
							$modalInstance.close();

						} else {
							$log.error('Form is not valid');
						}
					};
/*					$scope.ok = function () {
							$modalInstance.close();

					};*/

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				},
				size: size
			});

			modalInstance.result.then(function (selectedItem) {
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};


		//*******************************************************************************************************************************************
        // Open a modal window to Update a single customer record
        this.modalUpdate = function (size, selectedCustomer, updateCustomerForm) {

            var modalInstance = $modal.open({
                templateUrl: '/modules/customers/views/edit-customer.client.view.html',
                controller: function ($scope, $modalInstance, customer) {
                    $scope.customer = customer;

					$scope.ok = function(){
						if(updateCustomerForm.$valid){
							$log.info('Form is valid');
							$modalInstance.close($scope.customer);

						} else {
							$log.error('Form is not valid');
						}
                    };

                    $scope.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: size,
                resolve: {
                    customer: function() {
                        return selectedCustomer;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

		// Remove existing Customer
		this.remove = function(customer) {
			if (customer) {
				customer.$remove();

				for (var i in this.customers) {
					if (this.customers [i] === customer) {
						this.customers.splice(i, 1);
					}
				}
			} else {
				this.customer.$remove(function() {
				});
			}
		};


	}
]);

// CREATE CONTROLLER
customersApp.controller('CustomersCreateController', ['$scope', 'Customers', 'Notify',
	function($scope, Customers, Notify) {

		$scope.channelOptions = [
			{id: 1, item: 'Admin Bus'},
			{id: 2, item: 'Developer'},
			{id: 3, item: 'Technical Monitoring'},
			{id: 4, item: 'Buisness Monitoring'}
		];

		// Create new Customer
		this.create = function() {
			// Create new Customer object
			var customer = new Customers ({
			firstName: this.firstName,
			surname: this.surname,
			username: this.username,
			suburb: this.suburb,
			country: this.country,
			industry: this.industry,
			email: this.email,
			phone: this.phone,
			referred: this.referred,
			channel: this.channel
			});

			// Redirect after save
			customer.$save(function(response) {

				Notify.sendMsg('NewCustomer', {'id': response._id});

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};
	}
]);

// UPDATE CONTROLLER
customersApp.controller('CustomersUpdateController', ['$scope', 'Customers',
	function($scope, Customers) {

		$scope.channelOptions = [
			{id: 1, item: 'Admin Bus'},
			{id: 2, item: 'Developer'},
			{id: 3, item: 'Technical Monitoring'},
			{id: 4, item: 'Buisness Monitoring'}
		];
        
		// Update existing Customer
		this.update = function(updatedCustomer) {
			var customer = updatedCustomer;

			customer.$update(function() {

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);

/*		// Create new Customer
		$scope.create = function() {
			// Create new Customer object
			var customer = new Customers ({
				firstName: this.firstName,
                surname: this.surname,
                suburb: this.suburb,
                country: this.country,
                industry: this.industry,
                email: this.email,
                phone: this.phone,
                referred: this.referred,
                channel: this.channel
			});

			// Redirect after save
			customer.$save(function(response) {
				$location.path('customers/' + response._id);

				// Clear form fields
				$scope.firstName = '';
                $scope.surname = '';
                $scope.suburb = '';
                $scope.country = '';
                $scope.industry = '';
                $scope.email = '';
                $scope.phone = '';
                $scope.referred = '';
                $scope.channel = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Customer
		$scope.remove = function(customer) {
			if ( customer ) {
				customer.$remove();

				for (var i in $scope.customers) {
					if ($scope.customers [i] === customer) {
						$scope.customers.splice(i, 1);
					}
				}
			} else {
				$scope.customer.$remove(function() {
					$location.path('customers');
				});
			}
		};

		// Update existing Customer
		$scope.update = function() {
			var customer = $scope.customer;

			customer.$update(function() {
				$location.path('customers/' + customer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		// Find existing Customer
		$scope.findOne = function() {
			$scope.customer = Customers.get({
				customerId: $stateParams.customerId
			});
		};*/
