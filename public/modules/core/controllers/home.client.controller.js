'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        
        $scope.alerts = [
            {
                icon: 'glyphicon-user',
                colour: 'btn-success',
                total: '20.408',
                description: 'TOTAL CUSTOMERS'
            },
            {
                icon: 'glyphicon-calendar',
                colour: 'btn-primary',
                total: '8,382',
                description: 'UPCOMING EVENTS'
            },
            {
                icon: 'glyphicon-edit',
                colour: 'btn-success',
                total: '527',
                description: 'NEW CUSTOMERS IN 24H'
            },
            {
                icon: 'glyphicon-record',
                colour: 'btn-info',
                total: '85.000',
                description: 'EMAIL SENT'
            },
            {
                icon: 'glyphicon-eye-open',
                colour: 'btn-warning',
                total: '268',
                description: 'FOLLOW UP REQUIRED'
            },
            {
                icon: 'glyphicon-flag',
                colour: 'btn-danger',
                total: '348',
                description: 'REFERRALS TO MODERATE'
            }
        ];
        
	}
]);