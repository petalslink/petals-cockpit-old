'use strict';

angular.module('core')

    .controller('HomeController', ['$scope', 'Authentication',

        function ($scope, Authentication) {
            // This provides Authentication context.
            $scope.authentication = Authentication;

            $scope.alerts = [
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
            ];
        }
    ])

    .controller('SampleController', ['$scope',

        function ($scope) {

            $scope.sourceItems = [
                {
                    file1: 'Bus',
                    text1: 'Bus',
                    icon1: 'glyphicon-flash',
                    children1: [
                        {
                            file2: 'Node',
                            text2: 'Node',
                            icon2: 'glyphicon-triangle-bottom',
                            children2: [
                                {
                                    file3: 'Component',
                                    text3: 'Component',
                                    icon3: 'glyphicon-triangle-bottom',
                                    children3: [
                                        {
                                            file4: 'Service Unit',
                                            text4: 'Service Unit',
                                            icon4: 'glyphicon-triangle-bottom',
                                            children4: [
                                                {
                                                    file5: 'Service',
                                                    text5: 'Service',
                                                    icon5: 'glyphicon-triangle-bottom'
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
    ])

    .controller('MenuTemplateController', ['$scope',

        function($scope) {

        $scope.templates =
            [
                { name: 'overview', url: 'overview'},
                { name: 'admin', url: 'admin'},
                { name: 'monitor', url: 'monitor'},
                { name: 'configure', url: 'configure'},
                { name: 'log', url: 'log'},
                { name: 'flow', url: 'flow'},
                { name: 'user', url: 'user'}
            ];

        $scope.template = $scope.templates[0];
    }
    ]);