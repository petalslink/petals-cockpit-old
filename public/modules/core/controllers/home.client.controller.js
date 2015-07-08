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

app.controller('treeCtrl', ['$scope', '$timeout', '$TreeDnDConvert', 'Buses', 'Nodes', 'Components', 'Serviceunits', 'Services',
        function ($scope, $timeout, $TreeDnDConvert, Buses, Nodes, Components, Serviceunits, Services) {

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

            this.buses = Buses.getBuses();
            this.nodes = Nodes.getNodes();
            this.components = Components.getComponents();
            this.serviceunits = Serviceunits.getServiceunits();
            this.services = Services.getServices();

/*            var elementsLength = elements.length;
            for (var i = 0 ; i < elementsLength ; i ++) {
                if (elements[i].code === code) {
                    return elements[i];
                }
            }

            return null;*/

            var dataComponents = [
                {
                    'parentId':'1',
                    'title':this.buses,
                    'parent':null,
                    '__children__': [
                        {
                            'parentId':'2',
                            'title':this.nodes,
                            'parent':1,
                            '__children__': [
                                {
                                    'parentId':'3',
                                    'title':this.components,
                                    'parent':2,
                                    '__children__': [
                                        {
                                            'parentId':'4',
                                            'title':this.serviceunits,
                                            'parent':3,
                                            '__children__': [
                                                {
                                                    'parentId':'5',
                                                    'title':this.services,
                                                    'parent':4,
                                                    '__children__': []
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
            $scope.tree_data = $TreeDnDConvert.line2tree(dataComponents, 'parentId', 'parent');



/*            $TreeDnDConvert.line2tree(function(response) {
                // Assign the response INSIDE the callback
                $scope.data.components = response;
            });*/


            /*
             var components = [
             {
             'id':'1',
             'title':'Bus',
             'name': 'BUS-RH Domain',
             'parent':null

             },
             {
             'id':'2',
             'title':'Node',
             'parent':1
             },
             {
             'id':'3',
             'title':'Component',
             'parent':2

             },
             {
             'id':'4',
             'title':'Service Unit',
             'parent':3
             },
             {
             'id':'5',
             'title':'Service',
             'parent':4
             }
             ];*/
            /*
             $scope.tree_data = $TreeDnDConvert.line2tree(components, buses, 'id', 'parent');*/
        }]
);












