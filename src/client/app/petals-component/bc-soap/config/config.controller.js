(function () {
    'use strict';

    angular
        .module('petalsComponent.bc-soap.config')
        .controller('ConfigBcSoapController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['bcsoapData', 'elementData', 'configModalTile', 'logger'];

    /* @ngInject */
    function ControllerFunction(bcsoapData, elementData, configModalTile, logger) {

        var vm = this;

        vm.details = {};
        vm.tiles = [];
        vm.openModalTile = configModalTile.openModalTile;

        activate();

        function activate() {
            // init data with resolve from router
            vm.details = elementData;
            vm.config = bcsoapData;

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
                /* Component_part : HTTP */
                {
                    span: {row: 4, col:2},
                    background: 'yellow',
                    title: 'Component Part : Http',
                    model: {
                        http_port: vm.config.component_part.http_port,
                        http_host: vm.config.component_part.http_host,
                        http_service_list: vm.config.component_part.http_service_list,
                        http_service_context: vm.config.component_part.http_service_context,
                        http_service_mapping: vm.config.component_part.http_service_mapping,
                        http_thread_pool_size_min: vm.config.component_part.http_thread_pool_size_min,
                        http_thread_pool_size_max: vm.config.component_part.http_thread_pool_size_max,
                        http_acceptors: vm.config.component_part.http_acceptors,
                        http_backlog_size: vm.config.component_part.http_backlog_size,
                        max_http_connections_per_host: vm.config.component_part.max_http_connections_per_host
                    },
                    fieldsDisplay: [
                        {
                            key: 'http_port',
                            type: 'details',
                            templateOptions: {label: 'Http_port :'}
                        },
                        {
                            key: 'http_host',
                            type: 'details',
                            templateOptions: {label: 'Http_host :'}
                        },
                        {
                            key: 'http_service_list',
                            type: 'details',
                            templateOptions: {label: 'Http_service_list :'}
                        },
                        {
                            key: 'http_service_context',
                            type: 'details',
                            templateOptions: {label: 'Http_service_context :'}
                        },
                        {
                            key: 'http_service_mapping',
                            type: 'details',
                            templateOptions: {label: 'Http_service_mapping :'}
                        },
                        {
                            key: 'http_thread_pool_size_min',
                            type: 'details',
                            templateOptions: {label: 'Http_thread_pool_size_min :'}
                        },
                        {
                            key: 'http_thread_pool_size_max',
                            type: 'details',
                            templateOptions: {label: 'Http_thread_pool_size_max :'}
                        },
                        {
                            key: 'http_acceptors',
                            type: 'details',
                            templateOptions: {label: 'Http_acceptors :'}
                        },
                        {
                            key: 'http_backlog_size',
                            type: 'details',
                            templateOptions: {label: 'Http_backlog_size :'}
                        },
                        {
                            key: 'max_http_connections_per_host',
                            type: 'details',
                            templateOptions: {label: 'Max_http_connections_per_host :'}
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
                                    key: 'http_port',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Http_port : '}
                                },
                                {
                                    key: 'http_host',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {
                                        label: 'Http_host : ',
                                        placeholder: 'hostname or IP address',
                                        required : true
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
                                    key: 'http_service_list',
                                    type: 'switch',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Http_service_list', theme: 'cardCustom-theme'}
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
                                    key: 'http_service_context',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Http_service_context : '}
                                },
                                {
                                    key: 'http_service_mapping',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Http_service_mapping : '}
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
                                    key: 'http_thread_pool_size_min',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {
                                        label: 'Http_thread_pool_size_min : ',
                                        placeholder: 'between 2-255'
                                    }
                                },
                                {
                                    key: 'http_thread_pool_size_max',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {
                                        label: 'Http_thread_pool_size_max : ',
                                        placeholder: 'between 2-255'
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
                                    key: 'http_acceptors',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Http_acceptors : '}
                                },
                                {
                                    key: 'http_backlog_size',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Http_backlog_size : '}
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
                                    key: 'max_http_connections_per_host',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Max_http_connections_per_host : '}
                                }
                            ]
                        }
                    ]
                },
                /* Cdk_part */
                {
                    span: {row: 4, col:2},
                    background: 'green',
                    title: 'Cdk Part',
                    model: {
                        acceptor_pool_size: vm.config.cdk_part.acceptor_pool_size,
                        acceptor_retry_number: vm.config.cdk_part.acceptor_retry_number,
                        acceptor_retry_wait: vm.config.cdk_part.acceptor_retry_wait + ' ms ',
                        acceptor_stop_max_wait: vm.config.cdk_part.acceptor_stop_max_wait + ' ms ',
                        processor_pool_size: vm.config.cdk_part.processor_pool_size,
                        processor_max_pool_size: vm.config.cdk_part.processor_max_pool_size,
                        processor_keep_alive_time: vm.config.cdk_part.processor_keep_alive_time + ' ms ',
                        processor_stop_max_wait: vm.config.cdk_part.processor_stop_max_wait + ' ms ',
                        time_between_async_cleaner_runs: vm.config.cdk_part.time_between_async_cleaner_runs,
                        properties_file: vm.config.cdk_part.properties_file,
                        monitoring_sampling_period: vm.config.cdk_part.monitoring_sampling_period + ' ms '
                    },
                    fieldsDisplay: [
                        {
                            key: 'acceptor_pool_size',
                            type: 'details',
                            templateOptions: {label: 'Acceptor_pool_size :'}
                        },
                        {
                            key: 'acceptor_retry_number',
                            type: 'details',
                            templateOptions: {label: 'Acceptor_retry_number :'}
                        },
                        {
                            key: 'acceptor_retry_wait',
                            type: 'details',
                            templateOptions: {label: 'Acceptor_retry_wait :'}
                        },
                        {
                            key: 'acceptor_stop_max_wait',
                            type: 'details',
                            templateOptions: {label: 'Acceptor_stop_max_wait :'}
                        },
                        {
                            key: 'processor_pool_size',
                            type: 'details',
                            templateOptions: {label: 'Processor_pool_size :'}
                        },
                        {
                            key: 'processor_max_pool_size',
                            type: 'details',
                            templateOptions: {label: 'Processor_max_pool_size :'}
                        },
                        {
                            key: 'processor_keep_alive_time',
                            type: 'details',
                            templateOptions: {label: 'Processor_keep_alive_time :'}
                        },
                        {
                            key: 'processor_stop_max_wait',
                            type: 'details',
                            templateOptions: {label: 'Processor_stop_max_wait :'}
                        },
                        {
                            key: 'time_between_async_cleaner_runs',
                            type: 'details',
                            templateOptions: {label: 'Time_between_async_cleaner_runs :'}
                        },
                        {
                            key: 'properties_file',
                            type: 'details',
                            templateOptions: {label: 'Properties_file :'}
                        },
                        {
                            key: 'monitoring_sampling_period',
                            type: 'details',
                            templateOptions: {label: 'Monitoring_sampling_period :'}
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
                                    key: 'acceptor_pool_size',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Acceptor_pool_size : ', 'required': true}
                                },
                                {
                                    key: 'acceptor_retry_number',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Acceptor_retry_number : '}
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
                                    key: 'acceptor_retry_wait',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Acceptor_retry_wait : '}
                                },
                                {
                                    key: 'acceptor_retry_wait',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'select',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {
                                        label: 'Time Unit : ',
                                        theme: 'cardCustom-theme',
                                        multiple: false,
                                        labelProp: 'value',
                                        valueProp: 'valType',
                                        defaultValue: ' milliseconds ',
                                        options: [
                                            {
                                                value: 'milliseconds',
                                                valType: vm.config.cdk_part.acceptor_retry_wait + ' ms '
                                            },
                                            {
                                                value: 'seconds',
                                                valType: vm.config.cdk_part.acceptor_retry_wait / (1000) + ' s '
                                            },
                                            {
                                                value: 'minutes',
                                                valType: vm.config.cdk_part.acceptor_retry_wait / (60000) + ' min '
                                            }
                                        ]
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
                                    key: 'acceptor_stop_max_wait',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Acceptor_stop_max_wait : '}
                                },
                                {
                                    key: 'acceptor_stop_max_wait',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'select',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {
                                        label: 'Time Unit : ',
                                        theme: 'cardCustom-theme',
                                        multiple: false,
                                        labelProp: 'value',
                                        valueProp: 'valType',
                                        defaultValue: ' milliseconds ',
                                        options: [
                                            {
                                                value: 'milliseconds',
                                                valType: vm.config.cdk_part.acceptor_stop_max_wait + ' ms '
                                            },
                                            {
                                                value: 'seconds',
                                                valType: vm.config.cdk_part.acceptor_stop_max_wait / (1000) + ' s '
                                            },
                                            {
                                                value: 'minutes',
                                                valType: vm.config.cdk_part.acceptor_stop_max_wait / (60000) + ' min '
                                            }
                                        ]
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
                                    key: 'processor_pool_size',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Processor_pool_size : ', 'required': true}
                                },
                                {
                                    key: 'processor_max_pool_size',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Processor_max_pool_size : '}
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
                                    key: 'processor_keep_alive_time',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Processor_keep_alive_time : '}
                                },
                                {
                                    key: 'processor_keep_alive_time',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'select',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {
                                        label: 'Time Unit : ',
                                        theme: 'cardCustom-theme',
                                        multiple: false,
                                        labelProp: 'value',
                                        valueProp: 'valType',
                                        defaultValue: ' milliseconds ',
                                        options: [
                                            {
                                                value: 'milliseconds',
                                                valType:
                                                vm.config.cdk_part.processor_keep_alive_time + ' ms '
                                            },
                                            {
                                                value: 'seconds',
                                                valType:
                                                vm.config.cdk_part.processor_keep_alive_time / (1000) + ' s '
                                            },
                                            {
                                                value: 'minutes',
                                                valType:
                                                vm.config.cdk_part.processor_keep_alive_time / (60000) + ' min '
                                            }
                                        ]
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
                                    key: 'processor_stop_max_wait',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Processor_stop_max_wait : '}
                                },
                                {
                                    key: 'processor_stop_max_wait',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'select',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {
                                        label: 'Time Unit : ',
                                        theme: 'cardCustom-theme',
                                        multiple: false,
                                        labelProp: 'value',
                                        valueProp: 'valType',
                                        defaultValue: ' milliseconds ',
                                        options: [
                                            {
                                                value: 'milliseconds',
                                                valType: vm.config.cdk_part.processor_stop_max_wait + ' ms '
                                            },
                                            {
                                                value: 'seconds',
                                                valType: vm.config.cdk_part.processor_stop_max_wait / (1000) + ' s '
                                            },
                                            {
                                                value: 'minutes',
                                                valType: vm.config.cdk_part.processor_stop_max_wait / (60000) + ' min '
                                            }
                                        ]

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
                                    key: 'time_between_async_cleaner_runs',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Time_between_async_cleaner_runs : ', 'required': true}
                                },
                                {
                                    key: 'time_between_async_cleaner_runs',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'select',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {
                                        label: 'Time Unit : ',
                                        theme: 'cardCustom-theme',
                                        multiple: false,
                                        labelProp: 'value',
                                        valueProp: 'valType',
                                        defaultValue: {value: ' milliseconds '},
                                        options: [
                                            {
                                                value: 'milliseconds',
                                                valType:
                                                vm.config.cdk_part.monitoring_sampling_period + ' ms '
                                            },
                                            {
                                                value: 'seconds',
                                                valType:
                                                vm.config.cdk_part.monitoring_sampling_period / (1000) + ' s '
                                            },
                                            {
                                                value: 'minutes',
                                                valType:
                                                vm.config.cdk_part.monitoring_sampling_period / (60000) + ' min '
                                            }
                                        ]
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
                                    key: 'properties_file',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Properties_file : '},
                                    expressionProperties: {
                                        'templateOptions.disabled': 'true'
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
                                    key: 'monitoring_sampling_period',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Monitoring_sampling_period : '}
                                },
                                {
                                    key: 'monitoring_sampling_period',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'select',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {
                                        label: 'Time Unit : ',
                                        theme: 'cardCustom-theme',
                                        multiple: false,
                                        labelProp: 'value',
                                        valueProp: 'valType',
                                        defaultValue: {value: ' milliseconds '},
                                        options: [
                                            {
                                                value: 'milliseconds',
                                                valType:
                                                vm.config.cdk_part.monitoring_sampling_period + ' ms '
                                            },
                                            {
                                                value: 'seconds',
                                                valType:
                                                vm.config.cdk_part.monitoring_sampling_period / (1000) + ' s '
                                            },
                                            {
                                                value: 'minutes',
                                                valType:
                                                vm.config.cdk_part.monitoring_sampling_period / (60000) + ' min '
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                /* Component_part : HTTPS extensions */
                {
                    span: {row: 4, col:2},
                    background: 'purple',
                    title: 'Component Part : Https extensions',
                    model: {
                        https_enabled: vm.config.component_part.https_enabled,
                        https_port: vm.config.component_part.https_port,
                        https_acceptors: vm.config.component_part.https_acceptors,
                        https_backlog_size: vm.config.component_part.https_backlog_size,
                        https_keystore_type: vm.config.component_part.https_keystore_type,
                        https_keystore_file: vm.config.component_part.https_keystore_file,
                        https_keystore_password: vm.config.component_part.https_keystore_password,
                        https_key_password: vm.config.component_part.https_key_password,
                        https_truststore_type: vm.config.component_part.https_truststore_type,
                        https_truststore_file: vm.config.component_part.https_truststore_file,
                        https_truststore_password: vm.config.component_part.https_truststore_password,
                        https_client_authentication_enabled:
                        vm.config.component_part.https_client_authentication_enabled
                    },
                    fieldsDisplay: [
                        {
                            key: 'https_enabled',
                            type: 'details',
                            templateOptions: {label: 'Https_enabled :'}
                        },
                        {
                            key: 'https_port',
                            type: 'details',
                            templateOptions: {label: 'Https_port :'}
                        },
                        {
                            key: 'https_acceptors',
                            type: 'details',
                            templateOptions: {label: 'Https_acceptors :'}
                        },
                        {
                            key: 'https_backlog_size',
                            type: 'details',
                            templateOptions: {label: 'Https_backlog_size :'}
                        },
                        {
                            key: 'https_keystore_type',
                            type: 'details',
                            templateOptions: {label: 'Https_keystore_type :'}
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
                        },
                        {
                            key: 'https_key_password',
                            type: 'detailsPwd',
                            templateOptions: {label: 'Https_key_password :'}
                        },
                        {
                            key: 'https_truststore_type',
                            type: 'details',
                            templateOptions: {label: 'Https_truststore_type :'}
                        },
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
                            key: 'https_client_authentication_enabled',
                            type: 'details',
                            templateOptions: {label: 'Https_client_authentication_enabled'}
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
                                    key: 'https_enabled',
                                    type: 'switch',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Https_enabled', theme: 'cardCustom-theme'}
                                },
                                {
                                    key: 'https_port',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Https_port : '}
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
                                    key: 'https_acceptors',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Https_acceptors : '}
                                },
                                {
                                    key: 'https_backlog_size',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Https_backlog_size : '}
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
                                    key: 'https_keystore_type',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'select',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {
                                        label: 'Https_keystore_type : ',
                                        theme: 'cardCustom-theme',
                                        multiple: false,
                                        labelProp: 'value',
                                        valueProp: 'valType',
                                        defaultValue: 'JKS',
                                        options: [
                                            {
                                                value: 'JKS keystore/truststore',
                                                valType: 'JKS'
                                            },
                                            {
                                                value: 'PKCS12 keystore/truststore',
                                                valType: 'PKCS12'
                                            }
                                        ]
                                    }
                                },
                                {
                                    key: 'https_keystore_file',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Https_keystore_file : '},
                                    expressionProperties: {
                                        'templateOptions.disabled': 'true'
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
                                    key: 'checkPwdKeyStore',
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
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Https_keystore_password : '},
                                    hideExpression : '!model.checkPwdKeyStore'
                                },
                                {
                                    key: 'https_keystore_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Https_keystore_password : ', type: 'password'},
                                    hideExpression : 'model.checkPwdKeyStore'
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
                                    key: 'https_key_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Https_key_password : '},
                                    hideExpression : '!model.checkPwdKey'
                                },
                                {
                                    key: 'https_key_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Https_key_password : ', type: 'password'},
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
                                    key: 'https_truststore_type',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'select',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {
                                        label: 'Https_truststore_type : ',
                                        theme: 'cardCustom-theme',
                                        multiple: false,
                                        labelProp: 'value',
                                        valueProp: 'valType',
                                        defaultValue: 'JKS',
                                        options: [
                                            {
                                                value: 'JKS keystore/truststore',
                                                valType: 'JKS'
                                            },
                                            {
                                                value: 'PKCS12 keystore/truststore',
                                                valType: 'PKCS12'
                                            }
                                        ]
                                    }
                                },
                                {
                                    key: 'https_truststore_file',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Https_truststore_file : '},
                                    expressionProperties: {
                                        'templateOptions.disabled': 'true'
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
                                    key: 'checkPwdTrust',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'checkboxVisibility',
                                    templateOptions: {
                                        show: 'Hide the Password ?',
                                        hide: 'Show the Password ?',
                                        theme: 'cardCustom-theme'
                                    },
                                    expressionProperties: {
                                        'templateOptions.disabled': 'true'
                                    }
                                },
                                {
                                    key: 'https_truststore_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Https_truststore_password : '},
                                    expressionProperties: {
                                        'templateOptions.disabled': 'true'
                                    },
                                    hideExpression : '!model.checkPwdTrust'
                                },
                                {
                                    key: 'https_truststore_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {label: 'Https_truststore_password : ', type: 'password'},
                                    expressionProperties: {
                                        'templateOptions.disabled': 'true'
                                    },
                                    hideExpression : 'model.checkPwdTrust'
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
                                    key: 'https_client_authentication_enabled',
                                    type: 'switch',
                                    modelOptions: {debounce: {'default': 2000, blur: 0}, updateOn: 'default blur'},
                                    templateOptions: {
                                        label: 'Https_client_authentication_enabled',
                                        theme: 'cardCustom-theme'
                                    }
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
