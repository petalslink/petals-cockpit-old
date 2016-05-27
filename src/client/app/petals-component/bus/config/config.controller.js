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
                    background: 'imgGrid',
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
                },
                /* Registry Client */
                {
                    span: {row: 3, col: 2},
                    background: 'lightPurple',
                    title: 'Registry Client',
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
                /* Petals Containers */
                {
                    span: {row: 7, col: 2},
                    background: 'pink',
                    title: 'Petals Containers',
                    model: {
                        containers: vm.details.topology.containers,
                        overlay_members: vm.details.topology.containers.name,
                        host_name: vm.details.topology.containers.description,
                        host: vm.details.topology.containers.host,
                        user: vm.details.topology.containers.user,
                        password: vm.details.topology.containers.password,
                        jmx_port: vm.details.topology.containers.jmx_port,
                        transport_port: vm.details.topology.containers.transport_port
                    },
                    fieldsDisplay: [
                        {
                            type: 'arrayDisplay',
                            key: 'containers',
                            templateOptions: {
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
                                                type: 'details',
                                                key: 'name',
                                                templateOptions: {
                                                    label: 'Name :'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        elementAttributes: {
                                            layout: 'row',
                                            'layout-sm': 'row',
                                            'layout-xs': 'column'
                                        },
                                        fieldGroup: [
                                            {
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'details',
                                                key: 'description',
                                                templateOptions: {
                                                    label: 'Description :'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        elementAttributes: {
                                            layout: 'row',
                                            'layout-sm': 'row',
                                            'layout-xs': 'column'
                                        },
                                        fieldGroup: [
                                            {
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'details',
                                                key: 'host',
                                                templateOptions: {
                                                    label: 'Host :'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        elementAttributes: {
                                            layout: 'row',
                                            'layout-sm': 'row',
                                            'layout-xs': 'column'
                                        },
                                        fieldGroup: [
                                            {
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'details',
                                                key: 'user',
                                                templateOptions: {
                                                    label: 'User :'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        elementAttributes: {
                                            layout: 'row',
                                            'layout-sm': 'row',
                                            'layout-xs': 'column'
                                        },
                                        fieldGroup: [
                                            {
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'detailsPwd',
                                                key: 'password',
                                                templateOptions: {
                                                    label: 'Password :'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        elementAttributes: {
                                            layout: 'row',
                                            'layout-sm': 'row',
                                            'layout-xs': 'column'
                                        },
                                        fieldGroup: [
                                            {
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'details',
                                                key: 'jmx_port',
                                                templateOptions: {
                                                    label: 'Jmx_port :'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        elementAttributes: {
                                            layout: 'row',
                                            'layout-sm': 'row',
                                            'layout-xs': 'column'
                                        },
                                        fieldGroup: [
                                            {
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'details',
                                                key: 'transport_port',
                                                templateOptions: {
                                                    label: 'Transport_port :'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ],
                    fieldsModal: [
                        {
                            type: 'arrayInput',
                            key: 'containers',
                            templateOptions: {
                                btnAdd: 'Add New Containers',
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
                                                key: 'name',
                                                templateOptions: {
                                                    label: 'Name :',
                                                    required: true
                                                }
                                            },
                                            {
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'input',
                                                key: 'description',
                                                templateOptions: {
                                                    label: 'Description :',
                                                    required: true
                                                }
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
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'input',
                                                key: 'host',
                                                templateOptions: {
                                                    label: 'Host :',
                                                    required: true
                                                }
                                            },
                                            {
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'input',
                                                key: 'user',
                                                templateOptions: {
                                                    label: 'User :',
                                                    required: true
                                                }
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
                                                key: 'password',
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'input',
                                                templateOptions: {label: 'Password : ', 'required': true},
                                                hideExpression : '!model.checkPwdKey'
                                            },
                                            {
                                                key: 'password',
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'input',
                                                templateOptions: {
                                                    label: 'Password : ',
                                                    type: 'password',
                                                    'required': true
                                                },
                                                hideExpression : 'model.checkPwdKey'
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
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'input',
                                                key: 'jmx_port',
                                                templateOptions: {
                                                    label: 'Jmx_port :',
                                                    required: true
                                                }
                                            },
                                            {
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'input',
                                                key: 'transport_port',
                                                templateOptions: {
                                                    label: 'Transport_port :',
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
                /* Following Registry Client > Overlay_members */
                {
                    span: {row: 4, col: 2},
                    background: 'lightPurple',
                    title: '. . .',
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
                                lblOverlay: 'Overlay_members :',
                                fields: [
                                    {
                                        elementAttributes: {
                                            layout: 'row',
                                            'layout-sm': 'row',
                                            'layout-xs': 'column'
                                        },
                                        fieldGroup: [
                                            {
                                                className: 'flex-xs-100 flex-sm-100 flex-100',
                                                type: 'details',
                                                key: 'host_name',
                                                templateOptions: {
                                                    label: 'Host_name :'
                                                }
                                            }
                                        ]
                                    },
                                    {
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
                                    }
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
