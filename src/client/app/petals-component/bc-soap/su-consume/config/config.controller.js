(function () {
    'use strict';

    angular
        .module('petalsComponent.bc-soap.su-consume.config')
        .controller('ConfigBcSoapSuConsumeController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['promiseSUDetails', 'configModalTile', 'logger'];

    /* @ngInject */
    function ControllerFunction(promiseSUDetails, configModalTile, logger) {

        var vm = this;

        vm.details = {};
        vm.tiles = [];
        vm.openModalTile = configModalTile.openModalTile;

        activate();

        function activate() {
            // init data with resolve from router
            vm.details = promiseSUDetails;

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
                        name: vm.details.name,
                        description: vm.details.description
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
                        },
                        {
                            key: 'description',
                            type: 'details2lines',
                            templateOptions: {
                                label: 'Description : '
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
                                },
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
                /* Cdk_part */
                {
                    span: {row: 2, col:2},
                    background: 'green',
                    title: 'Cdk Part',
                    model: {
                        mep: vm.details.cdk_part.mep,
                        operation: vm.details.cdk_part.operation,
                        timeout: vm.details.cdk_part.timeout
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
                        wsdl: vm.details.soap_part.wsdl,
                        service_name: vm.details.soap_part.service_name,
                        soap_action: vm.details.soap_part.soap_action,
                        mode: vm.details.soap_part.mode,
                        enable_compatibility_for: vm.details.soap_part.enable_compatibility_for,
                        enable_http_transport: vm.details.soap_part.enable_http_transport,
                        enable_https_transport: vm.details.soap_part.enable_https_transport,
                        enable_jms_transport: vm.details.soap_part.enable_jms_transport,
                        http_services_redirection: vm.details.soap_part.http_services_redirection
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
                            key: 'mode',
                            type: 'details',
                            templateOptions: {label: 'Mode :'}
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
                                    key: 'enable_compatibility_for',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Enable_compatibility_for : '}
                                },
                                {
                                    key: 'enable_http_transport',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'switchCustom',
                                    defaultValue: true,
                                    templateOptions: {label: 'Enable_http_transport : ', theme: 'cardCustom-theme'}
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
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'switchCustom',
                                    defaultValue: false,
                                    templateOptions: {label: 'Enable_https_transport : ', theme: 'cardCustom-theme'}
                                },
                                {
                                    key: 'enable_jms_transport',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'switchCustom',
                                    defaultValue: false,
                                    templateOptions: {label: 'Enable_jms_transport : ', theme: 'cardCustom-theme'}
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
                                    key: 'http_services_redirection',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Http_services_redirection : '}
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
