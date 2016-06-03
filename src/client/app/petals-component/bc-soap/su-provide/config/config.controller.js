(function () {
    'use strict';

    angular
        .module('petalsComponent.bc-soap.su-provide.config')
        .controller('ConfigBcSoapSuProvideController', ControllerFunction);

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
                    span: {row: 3, col:2},
                    background: 'green',
                    title: 'Cdk Part',
                    model: {
                        timeout: vm.details.cdk_part.timeout,
                        validate_wsdl: vm.details.cdk_part.validate_wsdl,
                        wsdl: vm.details.cdk_part.wsdl,
                        forward_attachments: vm.details.cdk_part.forward_attachments,
                        forward_message_properties: vm.details.cdk_part.forward_message_properties,
                        forward_security_subject: vm.details.cdk_part.forward_security_subject
                    },
                    fieldsDisplay: [
                        {
                            key: 'timeout',
                            type: 'details',
                            templateOptions: {label: 'Timeout :'}
                        },
                        {
                            key: 'validate_wsdl',
                            type: 'details',
                            templateOptions: {label: 'Validate_wsdl :'}
                        },
                        {
                            key: 'wsdl',
                            type: 'details',
                            templateOptions: {label: 'Wsdl :'}
                        },
                        {
                            key: 'forward_attachments',
                            type: 'details',
                            templateOptions: {label: 'Forward_attachments :'}
                        },
                        {
                            key: 'forward_message_properties',
                            type: 'details',
                            templateOptions: {label: 'Forward_message_properties :'}
                        },
                        {
                            key: 'forward_security_subject',
                            type: 'details',
                            templateOptions: {label: 'Forward_security_subject :'}
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
                                    key: 'timeout',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Timeout : '}
                                },
                                {
                                    key: 'validate_wsdl',
                                    type: 'switch',
                                    defaultValue: true,
                                    templateOptions: {label: 'Validate_wsdl', theme: 'cardCustom-theme'}
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
                                    key: 'wsdl',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Wsdl : '}
                                },
                                {
                                    key: 'forward_attachments',
                                    type: 'switch',
                                    defaultValue: false,
                                    templateOptions: {label: 'Forward_attachments', theme: 'cardCustom-theme'}
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
                                    key: 'forward_message_properties',
                                    type: 'switch',
                                    defaultValue: false,
                                    templateOptions: {label: 'Forward_message_properties', theme: 'cardCustom-theme'}
                                },
                                {
                                    key: 'forward_security_subject',
                                    type: 'switch',
                                    defaultValue: false,
                                    templateOptions: {label: 'Forward_security_subject', theme: 'cardCustom-theme'}
                                }
                            ]
                        }
                    ]
                },
                /* Soap_part */
                {
                    span: {row: 3, col:2},
                    background: 'red',
                    title: 'Soap Part',
                    model: {
                        soap_version: vm.details.soap_part.soap_version,
                        wsa_to: vm.details.soap_part.wsa_to,
                        chunked_mode: vm.details.soap_part.chunked_mode,
                        enable_wsa: vm.details.soap_part.enable_wsa
                    },
                    fieldsDisplay: [
                        {
                            key: 'soap_version',
                            type: 'details',
                            templateOptions: {label: 'Soap_version :'}
                        },
                        {
                            key: 'wsa_to',
                            type: 'details',
                            templateOptions: {label: 'Wsa_to :'}
                        },
                        {
                            key: 'chunked_mode',
                            type: 'details',
                            templateOptions: {label: 'Chunked_mode :'}
                        },
                        {
                            key: 'enable_wsa',
                            type: 'details',
                            templateOptions: {label: 'Enable_wsa :'}
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
                                    key: 'soap_version',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'select',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {
                                        label: 'Soap_version : ',
                                        theme: 'cardCustom-theme',
                                        multiple: false,
                                        labelProp: 'value',
                                        valueProp: 'valType',
                                        defaultValue: '1.1',
                                        options: [
                                            {
                                                value: '1.1',
                                                valType: '1.1'
                                            },
                                            {
                                                value: '1.2',
                                                valType: '1.2'
                                            }
                                        ]
                                    }
                                },
                                {
                                    key: 'wsa_to',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Wsa_to : ', 'required': true}
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
                                    key: 'chunked_mode',
                                    type: 'switch',
                                    defaultValue: false,
                                    templateOptions: {label: 'Chunked_mode', theme: 'cardCustom-theme'}
                                },
                                {
                                    key: 'enable_wsa',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Enable_wsa : '}
                                }
                            ]
                        }
                    ]
                },
                /* Soap_part_proxy */
                {
                    span: {row: 2, col:2},
                    background: 'purple',
                    title: 'Soap Part : Proxy',
                    model: {
                        proxy_host: vm.details.soap_part.proxy_host,
                        proxy_port: vm.details.soap_part.proxy_port,
                        proxy_password: vm.details.soap_part.proxy_password,
                        proxy_domain: vm.details.soap_part.proxy_domain
                    },
                    fieldsDisplay: [
                        {
                            key: 'proxy_host',
                            type: 'details',
                            templateOptions: {label: 'Proxy_host :'}
                        },
                        {
                            key: 'proxy_port',
                            type: 'details',
                            templateOptions: {label: 'Proxy_port :'}
                        },
                        {
                            key: 'proxy_password',
                            type: 'detailsPwd',
                            templateOptions: {label: 'Proxy_password :'}
                        },
                        {
                            key: 'proxy_domain',
                            type: 'details',
                            templateOptions: {label: 'Proxy_domain :'}
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
                                    key: 'proxy_host',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Proxy_host : '}
                                },
                                {
                                    key: 'proxy_port',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Proxy_port : '}
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
                                    key: 'checkPwdProx',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'checkboxVisibility',
                                    templateOptions: {
                                        show: 'Hide the Password ?',
                                        hide: 'Show the Password ?',
                                        theme: 'cardCustom-theme'
                                    }
                                },
                                {
                                    key: 'proxy_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Proxy_password : '},
                                    hideExpression : '!model.checkPwdProx'
                                },
                                {
                                    key: 'proxy_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Proxy_password : ', type: 'password'},
                                    hideExpression : 'model.checkPwdProx'
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
                                    key: 'proxy_domain',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Proxy_domain : '}
                                }
                            ]
                        }
                    ]
                },
                /* Soap_part_https */
                {
                    span: {row: 2, col:2},
                    background: 'gray',
                    title: 'Soap Part : Https',
                    model: {
                        https_truststore_file: vm.details.soap_part.https_truststore_file,
                        https_truststore_password: vm.details.soap_part.https_truststore_password,
                        https_keystore_file: vm.details.soap_part.https_keystore_file,
                        https_keystore_password: vm.details.soap_part.https_keystore_password
                    },
                    fieldsDisplay: [
                        {
                            key: 'https_truststore_file',
                            type: 'details',
                            templateOptions: {label: 'Https_truststore_file :'}
                        },
                        {
                            key: 'https_truststore_password',
                            type: 'detailsPwd',
                            templateOptions: {label: 'Https_truststore_password :'}
                        },
                        {
                            key: 'https_keystore_file',
                            type: 'details',
                            templateOptions: {label: 'Https_keystore_file :'}
                        },
                        {
                            key: 'https_keystore_password',
                            type: 'detailsPwd',
                            templateOptions: {label: 'Https_keystore_password :'}
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
                                    key: 'https_truststore_file',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Https_truststore_file : '}
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
                                    key: 'checkPwdTruststore',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'checkboxVisibility',
                                    templateOptions: {
                                        show: 'Hide the Password ?',
                                        hide: 'Show the Password ?',
                                        theme: 'cardCustom-theme'
                                    }
                                },
                                {
                                    key: 'https_truststore_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Https_truststore_password : '},
                                    hideExpression : '!model.checkPwdTruststore'
                                },
                                {
                                    key: 'https_truststore_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Https_truststore_password : ', type: 'password'},
                                    hideExpression : 'model.checkPwdTruststore'
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
                                    key: 'https_keystore_file',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Https_keystore_file : '}
                                },
                                {
                                    key: 'https_truststore_file',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Https_truststore_file : '}
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
                                    key: 'checkPwdKeystore',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'checkboxVisibility',
                                    templateOptions: {
                                        show: 'Hide the Password ?',
                                        hide: 'Show the Password ?',
                                        theme: 'cardCustom-theme'
                                    }
                                },
                                {
                                    key: 'https_keystore_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Https_keystore_password : '},
                                    hideExpression : '!model.checkPwdKeystore'
                                },
                                {
                                    key: 'https_keystore_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Https_keystore_password : ', type: 'password'},
                                    hideExpression : 'model.checkPwdKeystore'
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
