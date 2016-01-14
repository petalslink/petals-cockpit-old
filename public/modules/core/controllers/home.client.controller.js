'use strict';

var app = angular.module('core');

app.controller('HomeController', ['Authentication', '$q', '$scope', '$timeout', 'Buses', 'Nodes', 'Components', 'Serviceunits', 'Services', '$rootScope', '$mdDialog', '$log', 'verifyDelete', 'verifyUpdate',

	function (Authentication, $q, $scope, $timeout, Buses, Nodes, Components, Serviceunits, Services, $rootScope, $mdDialog, $log, verifyDelete, verifyUpdate) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.template = '';

		$scope.isOpen = false;

/*		// Declare scope functions
		$scope.selectItem = selectItem;
		$scope.switchChildrenVisibility = switchChildrenVisibility;


		// Function implementations
		function selectItem(node) {

			$scope.sItem = node;
			$scope.template = node.type;
		}*/


		// Get initial values
/*		$q.all([
			Buses.getBuses().$promise,
			Nodes.getNodes().$promise,
			Components.getComponents().$promise,
			Serviceunits.getServiceunits().$promise,
			Services.getServices().$promise
		]).then(buildTree);*/

/*		function buildTree(data) {

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
					icon: 'device_hub',
					iconBusDelete: 'close',
					iconBusChildAdd: 'add'
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
					state: val.state,
					children: [],
					icon: 'developer_mode',
					iconNodeDelete: 'close',
					iconNodeState: 'fiber_smart_record',
					iconNodeChildAdd: 'add',
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
					state: val.state,
					children: [],
					icon: 'extension',
					iconComponentDelete: 'close',
					iconComponentState: 'fiber_smart_record',
					iconComponentChildAdd: 'add',
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
					type: 'su',
					state: val.state,
					children: [],
					icon: 'folder_special',
					iconServiceUnitDelete: 'close',
					iconServiceUnitState: 'fiber_smart_record',
					iconSuChildAdd: 'add',
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
					state: val.state,
					children: [],
					icon: 'usb',
					iconServiceDelete: 'close',
					iconServiceState: 'fiber_smart_record',
					parent: serviceunit
				};

				sindex[val._id] = service;
				var serviceunit = suindex[val.parentServiceunit._id];
				serviceunit.children.push(service);
			});

			// Register the tree in the scope TREE
			$scope.rootNodes = roots;

			// Recieve Event when push component on Nav Tree
			$scope.$on('BusCreate', function (event, bus) {
				$scope.rootNodes.push(bus);
				console.log('May Be Something Happens !!!!!!');

			});

			$scope.$on('NodeCreate', function (event, node) {
				$scope.rootNodes.push(node);
				console.log('May Be Something Happens !!!!!!');

			});

			$scope.$on('ComponentCreate', function (event, component) {
				$scope.rootNodes.push(component);
				console.log('May Be Something Happens !!!!!!');

			});

			$scope.$on('ServiceUnitCreate', function (event, serviceunit) {
				$scope.rootNodes.push(serviceunit);
				console.log('May Be Something Happens !!!!!!');

			});

			$scope.$on('ServiceCreate', function (event, service) {
				$scope.rootNodes.push(service);
				console.log('May Be Something Happens !!!!!!');

			});
		}*/



		/* Boolean Node Visible or not */
/*		function setChildrenVisibility (node, visible) {
			node.children.forEach(function (val, index, arr) {
				val.visible = visible;
			});
			console.log(node.children);
		}*/

/*		/!* 2 in 1 states *!/
		function switchChildrenVisibility( node ) {
			var visible = node.childrenWereVisible;

			node.childrenWereVisible = ! node.childrenWereVisible;
			node.children.forEach( function( child, index, arr ) {
				child.visible =  node.childrenWereVisible;
			})
		}*/

/*		$scope.showModalBranch = showModalBranch;*/

/*		$scope.showModalChangeName = function (child) {

			$scope.formChildData.title = child.title;
			$scope.formChildData.type = child.type;
			if (child.type === 'COMPONENT') {
				$scope.formChildData.componentType = child.componentType;
			}

			$mdDialog.show({
				parent: angular.element(document.body),
				targetEvent: child,
				clickOutsideToClose: true,
				templateUrl: '/modules/core/views/modal.change.name.html',
				resolve: {
					child: function () {
						return child;
					}
				},
				scope: $scope,
				controller: DialogController

			}).then(function (value) {
				$scope.renameChild(child);
				$scope.formChildData.title = '';
				$scope.formChildData.componentType = '';
				console.log(value);
			}, function (reject) {
				console.log(reject);
			});
		};

		function DialogController($scope, $mdDialog, child) {
			$scope.hide = function () {
				$mdDialog.hide();
			};

			$scope.cancel = function () {
				$mdDialog.cancel();
			};
			$scope.child = child;
		}*/

		$scope.addChild = function (child) {

			switch(child.type) {
				case 'BUS':
					$scope.formChildData.title = 'Server ';
					$scope.formChildData.type = 'SERVER';
					break;
				case 'SERVER':
					$scope.formChildData.title = 'BC- SE-';
					$scope.formChildData.type = 'COMPONENT';
					$scope.formChildData.componentType = $scope.componentTypeList[0];
					break;
				case 'COMPONENT':
					$scope.formChildData.title = 'SU-Service-';
					$scope.formChildData.type = 'SU';
					break;
				default:
					$scope.formChildData.title = 'Bus ';
					$scope.formChildData.type = 'BUS';
			}

			$mdDialog.show({
				parent: angular.element(document.body),
				clickOutsideToClose: true,
				templateUrl: '/modules/core/views/modal.add.branch.html',
				locals: {
					formChildData: $scope.formChildData
				},
				controller: function DialogController($scope, $mdDialog, formChildData){
					$scope.formChildData = formChildData;

					$scope.closeDialog = function() {
						$mdDialog.cancel();
					};
					$scope.validDialog = function() {
						$mdDialog.hide();
					};
				}

			}).then(function () {

				if ( $scope.formChildData.type === 'COMPONENT') {
					child.children.push({
						title: $scope.formChildData.title,
						type: $scope.formChildData.type,
						componentType: $scope.formChildData.componentType,
						children: []
					});
				} else {
					child.children.push({
						title: $scope.formChildData.title,
						type: $scope.formChildData.type,
						children: []
					});
				}

				$scope.formChildData.title = '';

			});
		};


		$scope.componentTypeList = [
			{id: 1, name: 'BC-SOAP', type:'BC'},
			{id: 2, name: 'BC-REST', type:'BC'},
			{id: 3, name: 'BC-MAIL', type:'BC'},
			{id: 4, name: 'SE-POJO', type:'SE'},
			{id: 5, name: 'SE-QUARTZ', type:'SE'}];

		$scope.choice = $scope.componentTypeList[0];


		$scope.formChildData = {
			title:'',
			type:'',
			componentType:''
		};

		$scope.json = '';
		$scope.data = {
			children: [{
				title: 'BUS 1 ',
				type: 'BUS',
				state: 'UNDEPLOYED',
				children: [{
					title: 'server 1',
					type: 'SERVER',
					children: []
				},
					{
						title: 'server 2',
						type: 'SERVER',
						children: []
					}]
			}]
		};

		$scope.getJson = function () {
			$scope.json = angular.toJson($scope.data);
		};

		$scope.toggleMinimized = function (child) {
			child.minimized = !child.minimized;
		};

		$scope.hideAdd = function (child) {
			return (child.type === 'SU');
		};

		$scope.isComponent = function (child) {
			return (child.type === 'COMPONENT');
		};

		$scope.upChild = function (child) {
			function walk(target) {
				var children = target.children,
					i;
				if (children) {
					i = children.length;
					while (i--) {
						if (children[i] === child) {
							if (i == 0) {
								return children;
							} else {
								children.splice(i, 1);
								return children.splice((i - 1), 0, child);
							}
						} else {
							walk(children[i])
						}
					}
				}
			}

			walk($scope.data);
		};

		$scope.downChild = function (child) {
			function walk(target) {
				var children = target.children,
					i;
				if (children) {
					i = children.length;
					while (i--) {
						if (children[i] === child) {
							if (i == children.length - 1) {
								return children;
							} else {
								children.splice(i, 1);
								return children.splice(i + 1, 0, child);
							}
						} else {
							walk(children[i])
						}
					}
				}
			}

			walk($scope.data);
		};

		$scope.delete = function (child) {

			verifyDelete(child)
				.then(function () {

					function walk(target) {
						var children = target.children;
						var i;
						if (children) {
							i = children.length;
							while (i--) {
								if (children[i] === child) {
									return children.splice(i, 1);
								} else {
									walk(children[i])
								}
							}
						}
					}

					walk($scope.data);
				});
		};

		$scope.renameChild = function (child) {

			verifyUpdate(child)
				.then(function () {

					child.title = $scope.formChildData.title;
				});


			$scope.update = function (event, ui) {

				var root = event.target;
				var item = ui.item;
				var parent = item.parent();
				var target = (parent[0] === root) ? $scope.data : parent.scope().child;
				var child = item.scope().child;
				var index = item.index();

				target.children || (target.children = []);

				function walk(target, child) {
					var children = target.children;
					var i;
					if (children) {
						i = children.length;
						while (i--) {
							if (children[i] === child) {
								return children.splice(i, 1);
							} else {
								walk(children[i], child);
							}
						}
					}
				}

				walk($scope.data, child);

				target.children.splice(index, 0, child);
			}
		};

	}]);


app.factory('verifyDelete', function($mdDialog) {

	return function(child) {

		var confirm = $mdDialog.confirm()

			.title('Confirm Your Choice')

			.content('Are you sure you want to delete ' + child.title + ' ' + '?')

			.ariaLabel('Delete')

			.ok('Delete')

			.cancel('Cancel');

		return $mdDialog.show(confirm);

	}

});

app.factory('verifyUpdate', function($mdDialog) {

	return function(child) {

		var confirm = $mdDialog.confirm()

			.title('Confirm Your Choice')

			.content('Are you sure you want to update ' + child.title + ' ' + '?')

			.ariaLabel('Update')

			.ok('Update')

			.cancel('Cancel');

		return $mdDialog.show(confirm);

	}

});

/*

app.factory('RefreshNavTree', function ($rootScope) {
	return function createTest() {

			var self = this;
			$rootScope.$on('BusCreate', function(eventName, bus) {
				self.buses.push(bus);
			});
		}

});*/
