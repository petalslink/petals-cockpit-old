'use strict';

var app = angular.module('core');

app.controller('HomeController', ['$scope', 'Authentication',

    function ($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

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

app.controller('treeCtrl', ['$q', '$scope', '$timeout', 'Buses', 'Nodes', 'Components', 'Serviceunits', 'Services',
        function ($q, $scope, $timeout, Buses, Nodes, Components, Serviceunits, Services) {

            // VZ

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
                        children: [],
                        icon: 'glyphicon-flash'
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
                        children: [],
                        icon: 'glyphicon-wrench',
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
                        children: [],
                        icon: 'glyphicon-tasks',
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
                        children: [],
                        icon: 'glyphicon-pushpin',
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
                        children: [],
                        icon: 'glyphicon-sort',
                        parent: serviceunit
                    };

                    sindex[val._id] = service;
                    var serviceunit = suindex[val.parentServiceunit._id];
                    serviceunit.children.push(service);
                });

                // Register the tree in the scope
                $scope.rootNodes = roots;
            }

        }]
);
