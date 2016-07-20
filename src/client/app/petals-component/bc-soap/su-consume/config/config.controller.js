(function () {
    'use strict';

    angular
        .module('petalsComponent.bc-soap.su-consume.config')
        .controller('ConfigBcSoapSuConsumeController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['suData', 'elementData', 'configModalTile', 'logger'];

    /* @ngInject */
    function ControllerFunction(suData, elementData, configModalTile, logger) {

        var vm = this;

        vm.details = {};
        vm.tiles = [];
        vm.openModalTile = configModalTile.openModalTile;

        activate();

        function activate() {
            // init data with resolve from router
            vm.details = elementData;
            vm.config = suData;

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
                                    type: 'detailsCenter',
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
                        name: vm.details.type
                    },
                    fieldsDisplay: [
                        {
                            key: 'name',
                            className: 'colorWhite',
                            type: 'detailsCenter',
                            templateOptions: {}
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
                                }
                            ]
                        }
                    ]
                },
                /* Jbi_part */
                {
                    span: {row: 3, col:2},
                    background: 'red',
                    title: 'Service',
                    model: {
                        mep: vm.config.cdk_part.mep,
                        operation: vm.config.cdk_part.operation,
                        timeout: vm.config.cdk_part.timeout
                    },
                    fieldsDisplay: [
                        {
                            key: 'mep',
                            type: 'details',
                            templateOptions: {label: 'Mep :'}
                        },
                        {
                            key: 'operation',
                            type: 'details',
                            templateOptions: {label: 'Operation :'}
                        },
                        {
                            key: 'timeout',
                            type: 'details',
                            templateOptions: {label: 'Timeout :'}
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
                                    key: 'mep',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Mep : '}
                                },
                                {
                                    key: 'operation',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Operation : '}
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
                                    key: 'timeout',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Timeout : '}
                                }
                            ]
                        }
                    ]
                },
                /* Soap_part */
                {
                    span: {row: 4, col:2},
                    background: 'purple',
                    title: 'Soap Part',
                    model: {
                        wsdl: vm.config.soap_part.wsdl,
                        service_name: vm.config.soap_part.service_name,
                        soap_action: vm.config.soap_part.soap_action,
                        enable_http_transport: vm.config.soap_part.enable_http_transport,
                        enable_https_transport: vm.config.soap_part.enable_https_transport,
                        enable_jms_transport: vm.config.soap_part.enable_jms_transport
                    },
                    fieldsDisplay: [
                        {
                            key: 'wsdl',
                            type: 'details',
                            templateOptions: {label: 'Wsdl :'}
                        },
                        {
                            key: 'service_name',
                            type: 'details',
                            templateOptions: {label: 'Service_name :'}
                        },
                        {
                            key: 'soap_action',
                            type: 'details',
                            templateOptions: {label: 'Soap_action :'}
                        },
                        {
                            key: 'enable_compatibility_for',
                            type: 'details',
                            templateOptions: {label: 'Enable_compatibility_for :'}
                        },
                        {
                            key: 'enable_http_transport',
                            type: 'details',
                            templateOptions: {label: 'Enable_http_transport :'}
                        },
                        {
                            key: 'enable_https_transport',
                            type: 'details',
                            templateOptions: {label: 'Enable_https_transport :'}
                        },
                        {
                            key: 'enable_jms_transport',
                            type: 'details',
                            templateOptions: {label: 'Enable_jms_transport :'}
                        },
                        {
                            key: 'http_services_redirection',
                            type: 'details',
                            templateOptions: {label: 'Http_services_redirection :'}
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
                                    key: 'wsdl',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Wsdl : '}
                                },
                                {
                                    key: 'service_name',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Service_name : ', 'required': true}
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
                                    key: 'soap_action',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Soap_action : '}
                                },
                                {
                                    key: 'enable_http_transport',
                                    type: 'switch',
                                    defaultValue: true,
                                    templateOptions: {label: 'Enable_http_transport', theme: 'cardCustom-theme'}
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
                                    key: 'enable_https_transport',
                                    type: 'switch',
                                    defaultValue: false,
                                    templateOptions: {label: 'Enable_https_transport', theme: 'cardCustom-theme'}
                                },
                                {
                                    key: 'enable_jms_transport',
                                    type: 'switch',
                                    defaultValue: false,
                                    templateOptions: {label: 'Enable_jms_transport', theme: 'cardCustom-theme'}
                                }
                            ]
                        }
                    ]
                },
                /* Cdk_part */
                {
                    span: {row: 2, col:2},
                    background: 'green',
                    title: 'Cdk Part',
                    model: {
                        mep: vm.config.cdk_part.mep,
                        operation: vm.config.cdk_part.operation,
                        timeout: vm.config.cdk_part.timeout
                    },
                    fieldsDisplay: [
                        {
                            key: 'mep',
                            type: 'details',
                            templateOptions: {label: 'Mep :'}
                        },
                        {
                            key: 'operation',
                            type: 'details',
                            templateOptions: {label: 'Operation :'}
                        },
                        {
                            key: 'timeout',
                            type: 'details',
                            templateOptions: {label: 'Timeout :'}
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
                                    key: 'mep',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Mep : '}
                                },
                                {
                                    key: 'operation',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Operation : '}
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
                                    key: 'timeout',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Timeout : '}
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
