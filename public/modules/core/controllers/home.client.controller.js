'use strict';

var app = angular.module('core');

app.controller('HomeController', ['Authentication', '$q', '$scope', '$timeout', 'Buses', 'Nodes', 'Components', 'Serviceunits', 'Services',

    function (Authentication, $q, $scope, $timeout, Buses, Nodes, Components, Serviceunits, Services) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.template = '';

        $scope.isOpen = false;
        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedAlignment: 'md-right'
        };

        // Declare scope functions
        $scope.selectItem = selectItem;

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
                    type: 'node',
                    ip: val.ip,
                    port: val.port,
                    parentBus: val.parentBus,
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
                    parentServer: val.parentServer,
                    type: 'component',
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
                    parentComponent: val.parentComponent,
                    state: val.states,
                    type: 'su',
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
                    parentServiceunit: val.parentServiceunit,
                    type: 'service',
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

    }]);

app.config(function($mdIconProvider) {
    $mdIconProvider
        .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
        .defaultIconSet('img/icons/sets/core-icons.svg', 24);
});