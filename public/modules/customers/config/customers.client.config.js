'use strict';

// Configuring the Articles module
angular.module('customers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Users', 'Customers', 'dropdown', '/customers(/create)?');
		Menus.addSubMenuItem('topbar', 'Customers', 'List Users', 'customers');
		//Menus.addSubMenuItem('topbar', 'customers', 'New User', 'customers/create');
	}
]);
