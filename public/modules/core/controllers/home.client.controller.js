'use strict';

var app = angular.module('core');

app.controller('HomeController', ['Authentication', '$q', '$scope', '$timeout', 'Buses', 'Nodes', 'Components', 'Serviceunits', 'Services', '$rootScope', '$mdDialog', '$log', 'verifyDelete',

	function (Authentication, $q, $scope, $timeout, Buses, Nodes, Components, Serviceunits, Services, $rootScope, $mdDialog, $log, verifyDelete) {
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

		$scope.showModalChangeName = function (child) {

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
			$scope.ok = function () {
				if ($mdDialog.$valid) {
					$log.info('Form is valid');
					$mdDialog.close();

				} else {
					$log.error('Form is not valid');
				}
			};
			$scope.cancel = function () {
				$mdDialog.cancel();
			};
			$scope.child = child;
		}

		$scope.showModalBranch = function (child) {

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
				targetEvent: child,
				clickOutsideToClose: true,
				template: '<form name="myFormNewBranch">' +
				'<md-content layout-padding layout="row" layout-sm="column" class="md-accent">' +
				'<p>New {{formChildData.type}}</p><br>' +
				'<p>Enter name: </p>' +
				'<input type="text" ng-model="formChildData.title" />' +
				'<br/>' +
				'<label ng-hide="!isComponent(formChildData)">Choice Component Type : </label>' +
				'<md-select ng-model="formChildData.componentType" ng-hide="!isComponent(formChildData)">' +
				'<md-option ng-value="choice" ng-repeat="choice in componentTypeList">{{choice.name}}</md-option>' +
				'</md-select>' +
				'<br/>' +
				'<md-button ng-click="ok(); answer();" class="md-fab md-mini md-accent md-whiteframe-z3 md-whiteframe-6dp">' +
				'<md-tooltip md-direction="bottom">ok</md-tooltip>' +
				'<md-icon class="md-accent md-24">done</md-icon>' +
				'</md-button>' +
				'<md-button ng-click="cancel()" class="md-fab md-mini md-accent md-whiteframe-z3 md-whiteframe-6dp">' +
				'<md-tooltip md-direction="bottom">cancel</md-tooltip>' +
				'<md-icon class="md-accent md-24">cancel</md-icon>' +
				'</md-button>' +
				'</md-content>' +
				'</form>',
				resolve: {
					child: function () {
						return child;
					}
				},
				scope: $scope

			}).then(function (answer) {
				$scope.status = 'You said the information was "' + answer + '".';
				$scope.addChild(child);
				$scope.formChildData.title = '';
				console.log(answer);
			}, function () {
				$scope.status = 'You cancelled the dialog.';
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

		$scope.addChild = function (child) {
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
		};

		$scope.renameChild = function (child) {
			child.title = $scope.formChildData.title;
		};

		$scope.delete = function(child) {

			verifyDelete(child).then(function() {

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

		$scope.update = function (event, ui) {

			var root = event.target,
				item = ui.item,
				parent = item.parent(),
				target = (parent[0] === root) ? $scope.data : parent.scope().child,
				child = item.scope().child,
				index = item.index();

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
		};



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
