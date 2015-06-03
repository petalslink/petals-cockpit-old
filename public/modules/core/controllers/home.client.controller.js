'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        
        $scope.alerts = [
            {
                icon: 'glyphicon-globe',
                colour: 'btn',
                total: '5',
                description: 'TOTAL USERS'
            },
            {
                icon: 'glyphicon-pencil',
                colour: 'btn',
                total: '1',
                description: 'NEW USERS IN 24H'
            },
            {
                icon: 'glyphicon-flash',
                colour: 'btn',
                total: '1',
                description: 'TOTAL BUS'
            },
            {
                icon: 'glyphicon-edit',
                colour: 'btn',
                total: '0',
                description: 'NEW BUS IN 24H'
            }
        ];
	}
]);