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
            displayName: 'Name WorkSpace'
        };
        $scope.col_defs = [];

        $scope.select_handler = function (node) {

        };

        $scope.click_handler = function (node) {

        };

        var components = [
            {'id':'1','title':'Bus','parent':null},
            {'id':'2','title':'Node','parent':1},
            {'id':'3','title':'Component','parent':2},
            {'id':'4','title':'Service Unit','parent':3},
            {'id':'5','title':'Service','parent':4}
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













