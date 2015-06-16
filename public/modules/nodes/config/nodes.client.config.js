'use strict';

angular.module('nodes')
	// Config HTTP Error Handling
	.config(['$httpProvider', function ($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function ($q, $location, Authentication) {
				return {
					responseError: function (rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
	]);

/*
	// Configuring the Articles module
	.run(['Menus', function (Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Node', 'nodes', 'dropdown', '/nodes(/create)?');
		Menus.addSubMenuItem('topbar', 'nodes', 'List Node', 'nodes');
		/!*Menus.addSubMenuItem('topbar', 'nodes', 'New Node', 'nodes/create');*!/
	}
	]);*/
