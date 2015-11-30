'use strict';

var app = angular.module('core');

app.controller('HomeController', ['Authentication', '$q', '$scope', '$timeout', 'Buses', 'Nodes', 'Components', 'Serviceunits', 'Services', '$rootScope',

	function (Authentication, $q, $scope, $timeout, Buses, Nodes, Components, Serviceunits, Services, $rootScope) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.template = '';

		$scope.isOpen = false;

		// Declare scope functions
		$scope.selectItem = selectItem;
		$scope.switchChildrenVisibility = switchChildrenVisibility;


		// Function implementations
		function selectItem(node) {

			$scope.sItem = node;
			$scope.template = node.type;
		}


		// Get initial values
		$q.all([
			Buses.getBuses().$promise,
			Nodes.getNodes().$promise,
			Components.getComponents().$promise,
			Serviceunits.getServiceunits().$promise,
			Services.getServices().$promise
		]).then(buildTree);

		function buildTree(data) {

			var roots = [];

			// Deal with buses
			var bindex = {};
			data[0].forEach(function (val, index, arr) {
				var bus = {
					_id: val._id,
					name: val.name,
					type: 'bus',
					version: val.version,
					children: [],
					icon: 'device_hub'
				};

				bindex[val._id] = bus;
				roots.push(bus);
			});

			// Deal with nodes -> console.log(data[1]);
			var nindex = {};
			data[1].forEach(function (val, index, arr) {
				var node = {
					_id: val._id,
					name: val.name,
					type: 'node',
					ip: val.ip,
					port: val.port,
					parentBus: val.parentBus,
					children: [],
					icon: 'developer_mode',
					parent: bus
				};

				nindex[val._id] = node;
				var bus = bindex[val.parentBus._id];
				bus.children.push(node);
			});

			// Deal with components
			var cindex = {};
			data[2].forEach(function (val, index, arr) {
				var component = {
					_id: val._id,
					name: val.name,
					parentServer: val.parentServer,
					type: 'component',
					children: [],
					icon: 'extension',
					parent: node
				};

				cindex[val._id] = component;
				var node = nindex[val.parentServer._id];
				node.children.push(component);
			});

			// Deal with serviceunits
			var suindex = {};
			data[3].forEach(function (val, index, arr) {
				var serviceunit = {
					_id: val._id,
					name: val.name,
					parentComponent: val.parentComponent,
					state: val.states,
					type: 'su',
					children: [],
					icon: 'folder_special',
					parent: component
				};

				suindex[val._id] = serviceunit;
				var component = cindex[val.parentComponent._id];
				component.children.push(serviceunit);
			});

			// Deal with services
			var sindex = {};
			data[4].forEach(function (val, index, arr) {
				var service = {
					_id: val._id,
					name: val.name,
					parentServiceunit: val.parentServiceunit,
					type: 'service',
					children: [],
					icon: 'usb',
					parent: serviceunit
				};

				sindex[val._id] = service;
				var serviceunit = suindex[val.parentServiceunit._id];
				serviceunit.children.push(service);
			});

			// Register the tree in the scope TREE
			$scope.rootNodes = roots;

		}

		// Recieve Event when push component on Nav Tree
		$scope.$on('BusCreate', function (event, bus) {
			$scope.rootNodes.push(bus);
			console.log("May Be Something Happens !!!!!!");

		});

		$scope.$on('NodeCreate', function (event, node) {
			$scope.rootNodes.push(node);
			console.log("May Be Something Happens !!!!!!");

		});

		$scope.$on('ComponentCreate', function (event, component) {
			$scope.rootNodes.push(component);
			console.log("May Be Something Happens !!!!!!");

		});

		$scope.$on('ServiceUnitCreate', function (event, serviceunit) {
			$scope.rootNodes.push(serviceunit);
			console.log("May Be Something Happens !!!!!!");

		});

		$scope.$on('ServiceCreate', function (event, service) {
			$scope.rootNodes.push(service);
			console.log("May Be Something Happens !!!!!!");

		});

		/* Boolean Node Visible or not */
/*		function setChildrenVisibility (node, visible) {
			node.children.forEach(function (val, index, arr) {
				val.visible = visible;
			});
			console.log(node.children);
		}*/

		/* 2 in 1 states */
		function switchChildrenVisibility( node ) {
			var visible = node.childrenWereVisible;

			node.childrenWereVisible = ! node.childrenWereVisible;
			node.children.forEach( function( child, index, arr ) {
				child.visible =  node.childrenWereVisible;
			})
		}

	}]);

/*

app.factory('RefreshNavTree', function ($rootScope) {
	return function createTest() {

			var self = this;
			$rootScope.$on('BusCreate', function(eventName, bus) {
				self.buses.push(bus);
			});
		}

});*/
