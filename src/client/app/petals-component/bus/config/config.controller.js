(function () {
    'use strict';

    angular
        .module('petalsComponent.bus.config')
        .controller('ConfigBusController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['promiseDetails', 'configModalTile', 'logger'];

    /* @ngInject */
    function ControllerFunction(promiseDetails, configModalTile, logger) {

        var vm = this;

        vm.details = {};
        vm.tiles = [];
        vm.openModalTile = configModalTile.openModalTile;

        activate();

        function activate() {
            // init data with resolve from router
            vm.details = promiseDetails;

            buildTiles();
        }

        function buildTiles() {

            // function assignment
            vm.onSubmit = onSubmit;

            vm.tiles = [
                /* State */
                {
                    span: {row: 2, col: 1},
                    background: 'orange',
                    title: 'State',
                    model: {
                        state: vm.details.state,
                        name: vm.details.name
                    },
                    fieldsDisplay: [
                        {
                            key: 'state',
                            type: 'detailsCenter',
                            templateOptions: {}
                        },
                        {
                            key: 'name',
                            type: 'details',
                            templateOptions: {
                                label: 'Name : '
                            }
                        }
                    ],
                    fieldsModal: [
                        {
                            elementAttributes: {
                                layout: 'row',
                                'layout-sm': 'column',
                                'layout-xs': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'state',
                                    type: 'details',
                                    templateOptions: {}
                                }
                            ]
                        },
                        {
                            elementAttributes: {
                                layout: 'row',
                                'layout-sm': 'column',
                                'layout-xs': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'name',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Name : ', 'required': true}
                                }
                            ]
                        }
                    ]
                },
                /* Type */
                {
                    span: {row: 2, col: 1},
                    background: 'imgGridBus',
                    title: 'Type',
                    model: {
                        name: vm.details.componentType.name,
                        version: vm.details.componentType.version
                    },
                    fieldsDisplay: [
                        {
                            key: 'name',
                            className: 'colorWhite',
                            type: 'detailsCenter',
                            templateOptions: {}
                        },
                        {
                            key: 'version',
                            className: 'colorWhite',
                            type: 'detailsCenter',
                            templateOptions: {
                                label: 'Version : '
                            }
                        }
                    ],
                    fieldsModal: [
                        {
                            elementAttributes: {
                                layout: 'row',
                                'layout-sm': 'column',
                                'layout-xs': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'name',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'detailsCenter',
                                    templateOptions: {}
                                },
                                {
                                    key: 'version',
                                    className: 'flex-xs-100 flex-sm-100 flex-50',
                                    type: 'detailsCenter',
                                    templateOptions: {label: 'Version : '}
                                }
                            ]
                        }
                    ]
                },
                /* Following Registry Server > Overlay_members */
                {
                    span: {row: 7, col: 2},
                    background: 'deepBlue',
                    title: 'Registry Server : Overlay_members',
                    model: {
                        overlay_members: vm.details.topology.registry.registry_configuration.overlay_members,
                        host_name: vm.details.topology.registry.registry_configuration.overlay_members.host_name,
                        port: vm.details.topology.registry.registry_configuration.overlay_members.port
                    },
                    fieldsDisplay: [
                        {
                            type: 'arrayDisplay',
                            key: 'overlay_members',
                            templateOptions: {
                                fields: [
                                    {
                                        elementAttributes: {
                                            layout: 'row',
                                            'layout-sm': 'row',
                                            'layout-xs': 'row'
                                        },
                                        fieldGroup: [

                                            {
                                                elementAttributes: {
                                                    layout: 'column',
                                                    'layout-sm': 'column',
                                                    'layout-xs': 'column'
                                                },
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'details',
                                                key: 'host_name',
                                                templateOptions: {
                                                    label: 'Host_name :'
                                                }
                                            },
                                            {
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'details',
                                                templateOptions: {
                                                    label: ''
                                                }
                                            },
                                            {
                                                elementAttributes: {
                                                    layout: 'column',
                                                    'layout-sm': 'column',
                                                    'layout-xs': 'column'
                                                },
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'details',
                                                key: 'port',
                                                templateOptions: {
                                                    label: 'Port :'
                                                }
                                            }
                                        ]
                                    }
/*                                    {
                                        elementAttributes: {
                                            layout: 'row',
                                            'layout-sm': 'row',
                                            'layout-xs': 'column'
                                        },
                                        fieldGroup: [
                                            {
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'details',
                                                key: 'port',
                                                templateOptions: {
                                                    label: 'Port :'
                                                }
                                            }
                                        ]
                                    }*/
                                ]
                            }
                        }
                    ],
                    fieldsModal: [
                        {
                            type: 'arrayInput',
                            key: 'overlay_members',
                            templateOptions: {
                                btnAdd: 'Add New Overlay_members',
                                fields: [
                                    {
                                        elementAttributes: {
                                            layout: 'row',
                                            'layout-sm': 'column',
                                            'layout-xs': 'column'
                                        },
                                        fieldGroup: [
                                            {
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'input',
                                                key: 'host_name',
                                                templateOptions: {
                                                    label: 'Host_name :',
                                                    required: true
                                                }
                                            },
                                            {
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'input',
                                                key: 'port',
                                                templateOptions: {
                                                    label: 'Port :',
                                                    required: true
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                },
                /* Registry Server */
                {
                    span: {row: 3, col: 2},
                    background: 'yellow',
                    title: 'Registry Server',
                    model: {
                        registry_implementation: vm.details.topology.registry.registry_implementation,
                        group_name: vm.details.topology.registry.registry_configuration.group_name,
                        group_password: vm.details.topology.registry.registry_configuration.group_password
                    },
                    fieldsDisplay: [
                        {
                            key: 'registry_implementation',
                            type: 'details',
                            templateOptions: {label: 'Registry_implementation : '}
                        },
                        {
                            key: 'registry_configuration',
                            type: 'details',
                            templateOptions: {label: 'Registry_configuration : '}
                        },
                        {
                            key: 'group_name',
                            type: 'details',
                            templateOptions: {label: 'Group_name : '}
                        },
                        {
                            key: 'group_password',
                            className: 'flex-xs-100 flex-sm-100 flex-100',
                            type: 'detailsPwd',
                            templateOptions: {label: 'Group_password : '}
                        }
                    ],
                    fieldsModal: [
                        {
                            elementAttributes: {
                                layout: 'row',
                                'layout-sm': 'column',
                                'layout-xs': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'registry_implementation',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Registry_implementation : ', 'required': true}
                                }
                            ]
                        },
                        {
                            elementAttributes: {
                                layout: 'column',
                                'layout-sm': 'column',
                                'layout-xs': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'registry_configuration',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'details',
                                    templateOptions: {label: 'Registry_configuration : '}
                                }
                            ]
                        },
                        {
                            elementAttributes: {
                                layout: 'column',
                                'layout-sm': 'column',
                                'layout-xs': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'group_name',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Group_name : ', 'required': true}
                                }
                            ]
                        },
                        {
                            elementAttributes: {
                                layout: 'row',
                                'layout-sm': 'column',
                                'layout-xs': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'checkPwdKey',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'checkboxVisibility',
                                    templateOptions: {
                                        show: 'Hide the Password ?',
                                        hide: 'Show the Password ?',
                                        theme: 'cardCustom-theme'
                                    }
                                },
                                {
                                    key: 'group_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Group_password : ', 'required': true},
                                    hideExpression : '!model.checkPwdKey'
                                },
                                {
                                    key: 'group_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Group_password : ', type: 'password', 'required': true},
                                    hideExpression : 'model.checkPwdKey'
                                }
                            ]
                        }
                    ]
                },
                /* Topology */
                {
                    span: {row: 2, col: 2},
                    background: 'green',
                    title: 'Topology',
                    model: {
                        name: vm.details.topology.domain.name,
                        mode: vm.details.topology.domain.mode,
                        description: vm.details.topology.domain.description
                    },
                    fieldsDisplay: [
                        {
                            key: 'name',
                            type: 'details',
                            templateOptions: {label: 'Name : '}
                        },
                        {
                            key: 'mode',
                            type: 'details',
                            templateOptions: {label: 'Mode : '}
                        },
                        {
                            key: 'description',
                            type: 'details',
                            templateOptions: {label: 'Description : '}
                        }
                    ],
                    elementAttributes: {
                        'layout': 'column'
                    },
                    fieldsModal: [
                        {
                            elementAttributes: {
                                layout: 'row',
                                'layout-sm': 'column',
                                'layout-xs': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'name',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Name : ', 'required': true}
                                },
                                {
                                    key: 'mode',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Mode : ', 'required': true}
                                }
                            ]
                        },
                        {
                            elementAttributes: {
                                layout: 'row',
                                'layout-sm': 'column',
                                'layout-xs': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'description',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Description : ', 'required': true}
                                }
                            ]
                        }
                    ]
                }
            ];

            vm.originalFields = angular.copy(vm.tiles.fieldsModal);

            // function definition
            function onSubmit() {
                logger.info('************* TEST ******************');
                logger.info(angular.toJson(vm.tiles.model), null, 2);
            }
        }


    }

})();
