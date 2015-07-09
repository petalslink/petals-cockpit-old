'use strict';

var app = angular.module('core');

app.controller('HomeController', ['$scope', 'Authentication',

    function ($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.components = {};

        /*        $scope.alerts = [
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
         ];*/
    }
]);

app.controller('treeCtrl', ['$q', '$scope', '$timeout', '$TreeDnDConvert', 'Buses', 'Nodes', 'Components', 'Serviceunits', 'Services',
        function ($q, $scope, $timeout, $TreeDnDConvert, Buses, Nodes, Components, Serviceunits, Services) {

            $scope.my_tree = {};

            $scope.my_tree.addFunction = function(b){
                console.log(b);
                alert('Function added in Controller "App.js"');
            };
            $scope.$callbacks = {};
            $scope._filter = {};
            $scope.tree_nodes = [];
            $scope.tree_data = {};
            $scope.expanding_property = {
                field: 'title',
                titleClass: 'text-left',
                cellClass: 'v-middle',
                displayName: 'Name WorkSpace'
            };
/*            $scope.col_defs = [
                {
                    field: "Description"
                }, {
                    displayName:  'Function',
                    cellTemplate: '<button ng-click="tree.addFunction(node)" class="btn btn-default btn-sm">Added Controller!</button>'
                }];*/
            $scope.select_handler = function (node) {
            };
            $scope.click_handler = function (node) {
            };

            
            // VZ
            
            $q.all([
                Buses.getBuses().$promise,
                Nodes.getNodes().$promise,
                Components.getComponents().$promise,
                Serviceunits.getServiceunits().$promise,
                Services.getServices().$promise
            ]).then( buildTree );
            
            
            function buildTree( data ) {
              
              var roots = [];

              // Deal with buses
              var bindex = {};
              data[0].forEach( function(val, index, arr) {
                var bus = {
                  _id: val._id,
                  name: val.name,
                  children: []
                };
                
                bindex[val._id] = bus;
                roots.push(bus);
              });

              // Deal with nodes
              var nindex = {};
              console.log(data[1]);
              data[1].forEach( function(val, index, arr) {
                var node = {
                  _id: val._id,
                  name: val.name,
                  children: [],
                  parent: bus
                };
                
                nindex[val._id] = node;
                var bus = bindex[val.parentBus._id];
                bus.children.push(node);
              });

              // Deal with components
              var cindex = {};
              data[2].forEach( function(val, index, arr) {
                var component = {
                  _id: val._id,
                  name: val.name,
                  children: [],
                  parent: node
                };
                
                cindex[val._id] = val;
                var node = nindex[val.parentServer._id];
                node.children.push(component);
              });
              
              // Register the tree in the scope
              $scope.rootNodes = roots;
            }
            
        }]
);
