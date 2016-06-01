(function () {
    'use strict';

    angular
        .module('petalsComponent.bc-soap.config')
        .controller('ConfigBcSoapController', ControllerFunction);

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
                    span: {row: 4, col:2},
                    background: 'green',
                    title: 'Cdk Part',
                    model: {
                        acceptor_pool_size: vm.details.cdk_part.acceptor_pool_size,
                        acceptor_retry_number: vm.details.cdk_part.acceptor_retry_number,
                        acceptor_retry_wait: vm.details.cdk_part.acceptor_retry_wait + ' ms ',
                        acceptor_stop_max_wait: vm.details.cdk_part.acceptor_stop_max_wait + ' ms ',
                        processor_pool_size: vm.details.cdk_part.processor_pool_size,
                        processor_max_pool_size: vm.details.cdk_part.processor_max_pool_size,
                        processor_keep_alive_time: vm.details.cdk_part.processor_keep_alive_time + ' ms ',
                        processor_stop_max_wait: vm.details.cdk_part.processor_stop_max_wait + ' ms ',
                        time_between_async_cleaner_runs: vm.details.cdk_part.time_between_async_cleaner_runs,
                        properties_file: vm.details.cdk_part.properties_file,
                        monitoring_sampling_period: vm.details.cdk_part.monitoring_sampling_period + ' ms '
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
                                    templateOptions: {label: 'Acceptor_pool_size : ', 'required': true}
                                },
                                {
                                    key: 'acceptor_retry_number',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
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
                                    templateOptions: {
                                        label: 'Time Unit : ',
                                        theme: "cardCustom-theme",
                                        multiple: false,
                                        labelProp: "value",
                                        valueProp: "valType",
                                        defaultValue: ' milliseconds ',
                                        options: [
                                            {
                                                value: 'milliseconds',
                                                valType: vm.details.cdk_part.acceptor_retry_wait + ' ms '
                                            },
                                            {
                                                value: 'seconds',
                                                valType: vm.details.cdk_part.acceptor_retry_wait / (1000) + ' s '
                                            },
                                            {
                                                value: 'minutes',
                                                valType: vm.details.cdk_part.acceptor_retry_wait / (60000) + ' min '
                                            }
                                        ]
                                    },
                                    watcher: {
                                        listener: function (field, newValue, oldValue, scope, stopWatching) {
                                            if(newValue) {
                                                console.log('Time: ' + newValue);
                                            }
                                        }
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
                                    templateOptions: {label: 'Acceptor_stop_max_wait : '}
                                },
                                {
                                    key: 'acceptor_stop_max_wait',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'select',
                                    templateOptions: {
                                        label: 'Time Unit : ',
                                        theme: "cardCustom-theme",
                                        multiple: false,
                                        labelProp: "value",
                                        valueProp: "valType",
                                        defaultValue: ' milliseconds ',
                                        options: [
                                            {
                                                value: 'milliseconds',
                                                valType: vm.details.cdk_part.acceptor_stop_max_wait + ' ms '
                                            },
                                            {
                                                value: 'seconds',
                                                valType: vm.details.cdk_part.acceptor_stop_max_wait / (1000) + ' s '
                                            },
                                            {
                                                value: 'minutes',
                                                valType: vm.details.cdk_part.acceptor_stop_max_wait / (60000) + ' min '
                                            }
                                        ]
                                    },
                                    watcher: {
                                        listener: function (field, newValue, oldValue, scope, stopWatching) {
                                            if(newValue) {
                                                console.log('Time: ' + newValue);
                                            }
                                        }
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
                                    templateOptions: {label: 'Processor_pool_size : ', 'required': true}
                                },
                                {
                                    key: 'processor_max_pool_size',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
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
                                    templateOptions: {label: 'Processor_keep_alive_time : '}
                                },
                                {
                                    key: 'processor_keep_alive_time',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'select',
                                    templateOptions: {
                                        label: 'Time Unit : ',
                                        theme: "cardCustom-theme",
                                        multiple: false,
                                        labelProp: "value",
                                        valueProp: "valType",
                                        defaultValue: ' milliseconds ',
                                        options: [
                                            {
                                                value: 'milliseconds',
                                                valType: vm.details.cdk_part.processor_keep_alive_time + ' ms '
                                            },
                                            {
                                                value: 'seconds',
                                                valType: vm.details.cdk_part.processor_keep_alive_time / (1000) + ' s '
                                            },
                                            {
                                                value: 'minutes',
                                                valType: vm.details.cdk_part.processor_keep_alive_time / (60000) + ' min '
                                            }
                                        ]
                                    },
                                    watcher: {
                                        listener: function (field, newValue, oldValue, scope, stopWatching) {
                                            if(newValue) {
                                                console.log('Time: ' + newValue);
                                            }
                                        }
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
                                    templateOptions: {label: 'Processor_stop_max_wait : '}
                                },
                                {
                                    key: 'processor_stop_max_wait',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'select',
                                    templateOptions: {
                                        label: 'Time Unit : ',
                                        theme: "cardCustom-theme",
                                        multiple: false,
                                        labelProp: "value",
                                        valueProp: "valType",
                                        defaultValue: ' milliseconds ',
                                        options: [
                                            {
                                                value: 'milliseconds',
                                                valType: vm.details.cdk_part.processor_stop_max_wait + ' ms '
                                            },
                                            {
                                                value: 'seconds',
                                                valType: vm.details.cdk_part.processor_stop_max_wait / (1000) + ' s '
                                            },
                                            {
                                                value: 'minutes',
                                                valType: vm.details.cdk_part.processor_stop_max_wait / (60000) + ' min '
                                            }
                                        ]
                                    },
                                    watcher: {
                                        listener: function (field, newValue, oldValue, scope, stopWatching) {
                                            if(newValue) {
                                                console.log('Time: ' + newValue);
                                            }
                                        }
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
                                    templateOptions: {label: 'Time_between_async_cleaner_runs : ', 'required': true}
                                },
                                {
                                    key: 'properties_file',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
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
                                    templateOptions: {label: 'Monitoring_sampling_period : '}
                                },
                                {
                                    key: 'monitoring_sampling_period',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'select',
                                    templateOptions: {
                                        label: 'Time Unit : ',
                                        theme: "cardCustom-theme",
                                        multiple: false,
                                        labelProp: "value",
                                        valueProp: "valType",
                                        defaultValue: ' milliseconds ',
                                        options: [
                                            {
                                                value: 'milliseconds',
                                                valType: vm.details.cdk_part.monitoring_sampling_period + ' ms '
                                            },
                                            {
                                                value: 'seconds',
                                                valType: vm.details.cdk_part.monitoring_sampling_period / (1000) + ' s '
                                            },
                                            {
                                                value: 'minutes',
                                                valType: vm.details.cdk_part.monitoring_sampling_period / (60000) + ' min '
                                            }
                                        ]
                                    },
                                    watcher: {
                                        listener: function (field, newValue, oldValue, scope, stopWatching) {
                                            if(newValue) {
                                                console.log('Time: ' + newValue);
                                            }
                                        }
                                    }
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
                        http_port: vm.details.component_part.http_port,
                        http_host: vm.details.component_part.http_host,
                        http_service_list: vm.details.component_part.http_service_list,
                        http_service_context: vm.details.component_part.http_service_context,
                        http_service_mapping: vm.details.component_part.http_service_mapping,
                        http_thread_pool_size_min: vm.details.component_part.http_thread_pool_size_min,
                        http_thread_pool_size_max: vm.details.component_part.http_thread_pool_size_max,
                        http_acceptors: vm.details.component_part.http_acceptors,
                        http_backlog_size: vm.details.component_part.http_backlog_size,
                        max_http_connections_per_host: vm.details.component_part.max_http_connections_per_host
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
                                    templateOptions: {label: 'Http_port : '}
                                },
                                {
                                    key: 'http_host',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'ipAddress',
                                    templateOptions: {label: 'Http_host : ', required : true}
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
                                    type: 'switch',
                                    defaultValue: true,
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
                                    templateOptions: {label: 'Http_service_context : '}
                                },
                                {
                                    key: 'http_service_mapping',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
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
                                    templateOptions: {label: 'Http_thread_pool_size_min : '}
                                },
                                {
                                    key: 'http_thread_pool_size_max',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Http_thread_pool_size_max : '}
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
                                    templateOptions: {label: 'Http_acceptors : '}
                                },
                                {
                                    key: 'http_backlog_size',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
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
                                    templateOptions: {label: 'Max_http_connections_per_host : '}
                                }
                            ]
                        }
                    ]
                },
                /* Component_part : HTTPS */
                {
                    span: {row: 4, col:2},
                    background: 'purple',
                    title: 'Component Part : Https',
                    model: {
                        https_enabled: vm.details.component_part.https_enabled,
                        https_port: vm.details.component_part.https_port,
                        https_acceptors: vm.details.component_part.https_acceptors,
                        https_backlog_size: vm.details.component_part.https_backlog_size,
                        https_keystore_type: vm.details.component_part.https_keystore_type,
                        https_keystore_file: vm.details.component_part.https_keystore_file,
                        https_keystore_password: vm.details.component_part.https_keystore_password,
                        https_key_password: vm.details.component_part.https_key_password,
                        https_truststore_type: vm.details.component_part.https_truststore_type,
                        https_truststore_file: vm.details.component_part.https_truststore_file,
                        https_truststore_password: vm.details.component_part.https_truststore_password
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
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'switch',
                                    defaultValue: false,
                                    templateOptions: {label: 'Https_enabled', theme: 'cardCustom-theme'}
                                },
                                {
                                    key: 'https_port',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
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
                                    templateOptions: {label: 'Https_acceptors : '}
                                },
                                {
                                    key: 'https_backlog_size',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
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
                                    type: 'input',
                                    templateOptions: {label: 'Https_keystore_type : '}
                                },
                                {
                                    key: 'https_keystore_file',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
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
                                    templateOptions: {label: 'Https_keystore_password : '},
                                    hideExpression : '!model.checkPwdKeyStore'
                                },
                                {
                                    key: 'https_keystore_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
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
                                    templateOptions: {label: 'Https_key_password : '},
                                    hideExpression : '!model.checkPwdKey'
                                },
                                {
                                    key: 'https_key_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
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
                                    type: 'input',
                                    templateOptions: {label: 'Https_truststore_type : '}
                                },
                                {
                                    key: 'https_truststore_file',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
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
                                    templateOptions: {label: 'Https_truststore_password : ', type: 'password'},
                                    expressionProperties: {
                                        'templateOptions.disabled': 'true'
                                    },
                                    hideExpression : 'model.checkPwdTrust'
                                }
                            ]
                        }
                    ]
                },
                /* Component_part : ... */
                {
                    span: {row: 2, col:2},
                    background: 'gray',
                    title: '...',
                    model: {
                        java_naming_factory_initial: vm.details.component_part.java_naming_factory_initial,
                        java_naming_provider_url: vm.details.component_part.java_naming_provider_url,
                        jms_connection_factory_jndiname: vm.details.component_part.jms_connection_factory_jndiname
                    },
                    fieldsDisplay: [
                        {
                            key: 'java_naming_factory_initial',
                            type: 'details',
                            templateOptions: {label: 'Java_naming_factory_initial :'}
                        },
                        {
                            key: 'java_naming_provider_url',
                            type: 'details',
                            templateOptions: {label: 'Java_naming_provider_url :'}
                        },
                        {
                            key: 'jms_connection_factory_jndiname',
                            type: 'detailsPwd',
                            templateOptions: {label: 'Jms_connection_factory_jndiname :'}
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
                                    key: 'java_naming_factory_initial',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Java_naming_factory_initial : '},
                                    expressionProperties: {
                                        'templateOptions.disabled': 'true'
                                    }
                                },
                                {
                                    key: 'java_naming_provider_url',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Java_naming_provider_url : '},
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
                                    key: 'jms_connection_factory_jndiname',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Jms_connection_factory_jndiname : '},
                                    expressionProperties: {
                                        'templateOptions.disabled': 'true'
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
