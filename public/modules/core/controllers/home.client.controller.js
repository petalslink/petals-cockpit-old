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

app.controller('treeCtrl', ['$scope', '$TreeDnDConvert', function ($scope, $TreeDnDConvert) {

        $scope.my_tree = {};
        $scope.tree_data = {};
        $scope._filter = {};
        $scope.expanding_property = {
            field:       'title',
            titleClass:  'text-left',
            cellClass:   'v-middle',
            displayName: 'WorkSpace'
        };
        $scope.col_defs = [];

        var node_selected, component_selected, serviceUnit_selected, service_selected;

        $scope.select_handler = function (node) {
            var ref;
            $scope.output = 'You selected: ' + node.title;
            console.log(node);
            alert('Message Error !!!!!!!!! ');
            if ((ref = node.data) != null ? ref.description : void 0) {
                return $scope.output += '(' + node.data.description + ')';
            }
        };

        node_selected = function (node) {
            return $scope.output = 'NODE : ' + node.title;
        };

        component_selected = function (node) {
            return $scope.output = 'COMPONENT : ' + node.title;
        };

        serviceUnit_selected = function (node) {
            return $scope.output = 'SERVICE UNIT : ' + node.title;
        };

        service_selected = function (node) {
            return $scope.output = 'SERVICE : ' + node.title;
        };

        var components = [
            {'id':'1','title':'Bus','parent':null,data: {
                definition: 'Bus Test Definition'
            },
                onSelect: function (node) {
                    return $scope.output = 'BUS : ' + node.data.definition;
                }
            },
            {'id':'2','title':'Node','parent':1,onSelect: node_selected},
            {'id':'3','title':'Component','parent':2,onSelect: component_selected},
            {'id':'4','title':'Service Unit','parent':3,onSelect: serviceUnit_selected},
            {'id':'5','title':'Service','parent':4,onSelect: service_selected}
        ];

        $scope.tree_data = $TreeDnDConvert.line2tree(components, 'id', 'parent');
    }]
);


/*
app.controller('NavTreeCtrl', ['$scope',

    function ($scope) {

        var node_selected, component_selected, serviceUnit_selected, service_selected;

        $scope.my_select_handler = function (branch) {
            var ref;
            $scope.output = "You selected: " + branch.label;
            if ((ref = branch.data) != null ? ref.description : void 0) {
                return $scope.output += '(' + branch.data.description + ')';
            }
        };

        node_selected = function (branch) {
            return $scope.output = "NODE : " + branch.label;
        };

        component_selected = function (branch) {
            return $scope.output = "COMPONENT : " + branch.label;
        };

        serviceUnit_selected = function (branch) {
            return $scope.output = "SERVICE UNIT : " + branch.label;
        };

        service_selected = function (branch) {
            return $scope.output = "SERVICE : " + branch.label;
        };


        $scope.data = [
            {
                label: 'Bus',
                data: {
                    definition: "Bus Test",
                    data_can_contain_anything: true
                },
                onSelect: function (branch) {
                    return $scope.output = "BUS : " + branch.data.definition;
                },
                children: [
                    {
                        label: 'Node',
                        onSelect: node_selected,
                        children: [
                            {
                                label: 'Component',
                                onSelect: component_selected,
                                children: [
                                    {
                                        label: 'Service Unit',
                                        onSelect: serviceUnit_selected,
                                        children: [
                                            {
                                                label: 'Service',
                                                onSelect: service_selected
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    }

]);

*/













