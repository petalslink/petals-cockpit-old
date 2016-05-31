(function () {
    'use strict';

    angular
        .module('petalsComponent.server.config')
        .controller('ConfigServerController', ControllerFunction);

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
                    fields: [
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
                    background: 'imgGridServer',
                    title: 'Type',
                    model: {
                        name: vm.details.componentType.name,
                        version: vm.details.componentType.version
                    },
                    fields: [
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
                /* Host */
                {
                    span: {row: 2, col: 1},
                    background: 'red',
                    color: 'colorBlack',
                    title: 'Host',
                    model: {
                        host: vm.details.host,
                        jmx_port: vm.details.jmx_port,
                        transport_port: vm.details.transport_port,
                        user: vm.details.user,
                        password: vm.details.password
                    },
                    fields: [
                        {
                            key: 'host',
                            type: 'details',
                            templateOptions: {
                                label: 'Host : '
                            }
                        },
                        {
                            key: 'jmx_port',
                            type: 'details',
                            templateOptions: {
                                label: 'Jmx_port : '
                            }
                        },
                        {
                            key: 'transport_port',
                            type: 'details',
                            templateOptions: {
                                label: 'Transport_port : '
                            }
                        },
                        {
                            key: 'user',
                            type: 'details',
                            templateOptions: {
                                label: 'User : '
                            }
                        },
                        {
                            key: 'password',
                            type: 'detailsPwd',
                            templateOptions: {label: 'Password : '}
                        }
                    ],
                    fieldsModal: [
                                                        {
                                    key: 'host',
                                    className: 'flex-xs-100 flex-sm-100 flex-50',
                                    type: 'input',
                                    templateOptions: {
                                        label: 'Host : ',
                                        placeholder: 'xxx.xxx.xxx.xxx',
                                        'required': true,
                                        maxlength: 15,
                                        minlength: 7,
                                        type: 'ipAddress'
                                    }
                                },
                                {
                                    key: 'jmx_port',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Jmx_port : ', placeholder: 'xxxx', 'required': true}
                                },

                        {
                            elementAttributes: {
                                layout: 'row',
                                'layout-sm': 'column',
                                'layout-xs': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'transport_port',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Transport_port : ', placeholder: 'xxxx', 'required': true}
                                },
                                {
                                    key: 'user',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'User : ', 'required': true}
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
                                    key: 'checkPwd',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'checkboxVisibility',
                                    templateOptions: {
                                        show: 'Hide the User Password ?',
                                        hide: 'Show the User Password ?',
                                        theme: 'cardCustom-theme'
                                    }
                                },
                                {
                                    key: 'password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Password : ', 'required': true},
                                    hideExpression : '!model.checkPwd'
                                },
                                {
                                    key: 'password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Password : ', type: 'password', 'required': true},
                                    hideExpression : 'model.checkPwd'
                                }
                            ]
                        }
                    ]
                },
                /* Topology */
                {
                    span: {row: 3, col: 1},
                    background: 'blue',
                    title: 'Topology',
                    model: {
                        url: vm.details.topology.url,
                        passphrase: vm.details.topology.passphrase,
                        dynamic_lock_wait_time: vm.details.topology.dynamic_lock_wait_time,
                        pinger: '',
                        start_delay: vm.details.topology.pinger.start_delay,
                        period_delay: vm.details.topology.pinger.period_delay
                    },
                    fields: [
                        {
                            key: 'url',
                            type: 'details',
                            templateOptions: {label: 'Url : '}
                        },
                        {
                            key: 'passphrase',
                            type: 'details',
                            templateOptions: {label: 'Passphrase : '}
                        },
                        {
                            key: 'dynamic_lock_wait_time',
                            type: 'details',
                            templateOptions: {label: 'Dynamic_lock_wait_time : '}
                        },
                        {
                            key: 'pinger',
                            type: 'details',
                            templateOptions: {label: 'Pinger : '}
                        },
                        {
                            key: 'start_delay',
                            type: 'details',
                            templateOptions: {label: '--> Start_delay : '}
                        },
                        {
                            key: 'period_delay',
                            type: 'details',
                            templateOptions: {label: '--> Period_delay : '}
                        }
                    ],
                    elementAttributes: {
                        'layout': 'column'
                    },
                    fieldsModal: [
                        {
                            elementAttributes: {
                                layout: 'column',
                                'layout-sm': 'column',
                                'layout-xs': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'url',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Url : '},
                                    expressionProperties: {
                                        'templateOptions.disabled': 'true'
                                    }
                                },
                                {
                                    key: 'passphrase',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Passphrase : ', 'required': true}
                                },
                                {
                                    key: 'dynamic_lock_wait_time',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Dynamic_lock_wait_time : ', 'required': true}
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
                                    key: 'pinger',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'details2lines',
                                    templateOptions: {label: 'Pinger : '}
                                },
                                {
                                    key: 'start_delay',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Start_delay : ', 'required': true}
                                },
                                {
                                    key: 'period_delay',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Period_delay : ', 'required': true}
                                }
                            ]
                        }

                    ]
                },
                /* General Properties */
                {
                    span: {row: 3, col: 2},
                    background: 'green',
                    color: 'colorBlack',
                    title: 'General Properties',
                    model: {
                        data_basedir: vm.details.general.data_basedir,
                        repository_path: vm.details.general.repository_path,
                        work_path: vm.details.general.work_path,
                        log_config_file: vm.details.general.log_config_file,
                        task_timeout: vm.details.general.task_timeout,
                        exchange_validation: vm.details.general.exchange_validation,
                        classloaders_isolated: vm.details.general.classloaders_isolated,
                        container_moves_lock_wait_time: vm.details.general.container_moves_lock_wait_time
                    },
                    fields: [
                        {
                            key: 'data_basedir',
                            type: 'details',
                            templateOptions: {label: 'Data_basedir : '}
                        },
                        {
                            key: 'repository_path',
                            type: 'details',
                            templateOptions: {label: 'Repository_path : '}
                        },
                        {
                            key: 'work_path',
                            type: 'details',
                            templateOptions: {label: 'Work_path : '}
                        },
                        {
                            key: 'log_config_file',
                            type: 'details',
                            templateOptions: {label: 'Log_config_file : '}
                        },
                        {
                            key: 'task_timeout',
                            type: 'details',
                            templateOptions: {label: 'Task_timeout : '}
                        },
                        {
                            key: 'exchange_validation',
                            type: 'details',
                            templateOptions: {label: 'Exchange_validation : '}
                        },
                        {
                            key: 'classloaders_isolated',
                            type: 'details',
                            templateOptions: {label: 'Classloaders_isolated : '}
                        },
                        {
                            key: 'container_moves_lock_wait_time',
                            type: 'details',
                            templateOptions: {label: 'Container_moves_lock_wait_time : '}
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
                                    key: 'data_basedir',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Data_basedir : ', 'required': true}
                                },
                                {
                                    key: 'repository_path',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Repository_path : ', 'required': true}
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
                                    key: 'work_path',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Work_path : ', 'required': true}
                                },
                                {
                                    key: 'log_config_file',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Log_config_file : ', 'required': true}
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
                                    key: 'task_timeout',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Task_timeout : ', 'required': true}
                                },
                                {
                                    key: 'container_moves_lock_wait_time',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Container_moves_lock_wait_time : ', 'required': true}
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
                                    key: 'exchange_validation',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'switchCustom',
                                    templateOptions: {label: 'Exchange_validation : ', theme: 'cardCustom-theme'}
                                },
                                {
                                    key: 'classloaders_isolated',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'switchCustom',
                                    templateOptions: {label: 'Classloaders_isolated : ', theme: 'cardCustom-theme'}
                                }
                            ]
                        }
                    ]
                },
                /* SSL Connections */
                {
                    span: {row: 3, col: 1},
                    background: 'purple',
                    color: 'colorBlack',
                    title: 'SSL Connections',
                    model: {
                        key_password: vm.details.ssl.key_password,
                        keystore: '',
                        keystore_file: vm.details.ssl.keystore.file,
                        keystore_password: vm.details.ssl.keystore.password,
                        truststore: '',
                        truststore_file: vm.details.ssl.truststore.file,
                        truststore_password: vm.details.ssl.truststore.password
                    },
                    fields: [
                        {
                            key: 'key_password',
                            type: 'detailsPwd',
                            templateOptions: {label: 'Key_password : '}
                        },
                        {
                            key: 'keystore',
                            type: 'details',
                            templateOptions: {label: 'Keystore : '}
                        },
                        {
                            key: 'keystore_file',
                            type: 'details',
                            templateOptions: {label: '--> File : '}
                        },
                        {
                            key: 'keystore_password',
                            type: 'detailsPwd',
                            templateOptions: {label: '--> Password : '}
                        },
                        {
                            key: 'truststore',
                            type: 'details',
                            templateOptions: {label: 'Truststore : '}
                        },
                        {
                            key: 'truststore_file',
                            type: 'details',
                            templateOptions: {label: '--> File : '}
                        },
                        {
                            key: 'truststore_password',
                            type: 'detailsPwd',
                            templateOptions: {label: '--> Password : '}
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
                                    key: 'checkPwdKey',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'checkboxVisibility',
                                    templateOptions: {
                                        show: 'Hide the Key Password ?',
                                        hide: 'Show the Key Password ?',
                                        theme: 'cardCustom-theme'
                                    }
                                },
                                {
                                    key: 'key_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Key_password : ', 'required': true},
                                    hideExpression : '!model.checkPwdKey'
                                },
                                {
                                    key: 'key_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Key_password : ', type: 'password', 'required': true},
                                    hideExpression : 'model.checkPwdKey'
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
                                    key: 'keystore',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'details',
                                    templateOptions: {label: 'Keystore : '}
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
                                    key: 'keystore_file',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'details',
                                    templateOptions: {label: 'File : '}
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
                                        show: 'Hide the Keystore Password ?',
                                        hide: 'Show the Keystore Password ?',
                                        theme: 'cardCustom-theme'
                                    }
                                },
                                {
                                    key: 'keystore_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Keystore_password : ', 'required': true},
                                    hideExpression : '!model.checkPwdKeystore'
                                },
                                {
                                    key: 'keystore_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {
                                        label: 'Keystore_password : ',
                                        type: 'password',
                                        'required': true
                                    },
                                    hideExpression: 'model.checkPwdKeystore'
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
                                    key: 'truststore',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'details',
                                    templateOptions: {label: 'Truststore : '}
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
                                    key: 'truststore_file',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'details',
                                    templateOptions: {label: 'File : '}
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
                                        show: 'Hide the Truststore Password ?',
                                        hide: 'Show the Truststore Password ?',
                                        theme: 'cardCustom-theme'
                                    }
                                },
                                {
                                    key: 'truststore_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Truststore_password : ', 'required': true},
                                    hideExpression : '!model.checkPwdTruststore'
                                },
                                {
                                    key: 'truststore_password',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {
                                        label: 'Truststore_password : ',
                                        type: 'password',
                                        'required': true
                                    },
                                    hideExpression: 'model.checkPwdTruststore'
                                }
                            ]
                        }
                    ]
                },
                /* Transporter Configuration */
                {
                    span: {row: 5, col: 1},
                    background: 'pink',
                    color: 'colorBlack',
                    title: 'Transporter Configuration',
                    model: {
                        queue: '',
                        max_size: vm.details.transport.queue.max_size,
                        offering_timeout: vm.details.transport.queue.offering_timeout,
                        tcp: '',
                        receivers: '',
                        tcp_receivers_listening_interface: vm.details.transport.tcp.receivers.listening_interface,
                        tcp_receivers_numbers: vm.details.transport.tcp.receivers.numbers,
                        tcp_receivers_keep_alive: vm.details.transport.tcp.receivers.keep_alive,
                        senders: '',
                        tcp_senders_numbers: vm.details.transport.tcp.senders.numbers,
                        tcp_senders_connection_timeout: vm.details.transport.tcp.senders.connection_timeout,
                        tcp_senders_timeout: vm.details.transport.tcp.senders.timeout,
                        tcp_senders_evictor_delay: vm.details.transport.tcp.senders.evictor_delay
                    },
                    fields: [
                        {
                            key: 'queue',
                            type: 'details',
                            templateOptions: {label: 'Queue : '}
                        },
                        {
                            key: 'max_size',
                            type: 'details',
                            templateOptions: {label: '--> Max_size : '}
                        },
                        {
                            key: 'offering_timeout',
                            type: 'details',
                            templateOptions: {label: '--> Offering_timeout : '}
                        },
                        {
                            key: 'tcp',
                            type: 'details',
                            templateOptions: {label: 'Tcp : '}
                        },
                        {
                            key: 'receivers',
                            type: 'details',
                            templateOptions: {label: '--> Receivers : '}
                        },
                        {
                            key: 'tcp_receivers_listening_interface',
                            type: 'details',
                            templateOptions: {label: '-----> Listening_interface : '}
                        },
                        {
                            key: 'tcp_receivers_numbers',
                            type: 'details',
                            templateOptions: {label: '-----> Numbers : '}
                        },
                        {
                            key: 'tcp_receivers_keep_alive',
                            type: 'details',
                            templateOptions: {label: '-----> Keep_alive : '}
                        },
                        {
                            key: 'senders',
                            type: 'details',
                            templateOptions: {label: '--> Senders : '}
                        },
                        {
                            key: 'tcp_senders_numbers',
                            type: 'details',
                            templateOptions: {label: '-----> Numbers : '}
                        },
                        {
                            key: 'tcp_senders_connection_timeout',
                            type: 'details',
                            templateOptions: {label: '-----> Connection_timeout : '}
                        },
                        {
                            key: 'tcp_senders_timeout',
                            type: 'details',
                            templateOptions: {label: '-----> Timeout : '}
                        },
                        {
                            key: 'tcp_senders_evictor_delay',
                            type: 'details',
                            templateOptions: {label: '-----> Evictor_delay : '}
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
                                    key: 'queue',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'details',
                                    templateOptions: {label: 'Queue : '}
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
                                    key: 'max_size',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Max_size : ', 'required': true}
                                },
                                {
                                    key: 'offering_timeout',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Offering_timeout : ', 'required': true}
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
                                    key: 'tcp',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'details',
                                    templateOptions: {label: 'Tcp : '}
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
                                    key: 'receivers',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'inputDetailsSub',
                                    templateOptions: {label: 'Receivers : '}
                                },
                                {
                                    key: 'tcp_receivers_listening_interface',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'ipAddress',
                                    templateOptions: {label: 'Listening_interface : ', 'required': true}
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
                                    key: 'tcp_receivers_numbers',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Numbers : ', 'required': true}
                                },
                                {
                                    key: 'tcp_receivers_keep_alive',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Keep_alive : ', 'required': true}
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
                                    key: 'senders',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'inputDetailsSub',
                                    templateOptions: {label: 'Senders : '}
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
                                    key: 'tcp_senders_numbers',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Numbers : ', 'required': true}
                                },
                                {
                                    key: 'tcp_senders_connection_timeout',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Connection_timeout : ', 'required': true}
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
                                    key: 'tcp_senders_timeout',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Timeout : ', 'required': true}
                                },
                                {
                                    key: 'tcp_senders_evictor_delay',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Evictor_delay : ', 'required': true}
                                }
                            ]
                        }
                    ]
                },

                /* Router */
                {
                    span: {row: 3, col: 1},
                    background: 'gray',
                    title: 'Router',
                    model: {
                        strategy: vm.details.router.strategy,
                        send_attempt: vm.details.router.send_attempt,
                        send_delay: vm.details.router.send_delay,
                        traffic_stop_delay: vm.details.router.traffic_stop_delay,
                        traffic_pause_delay: vm.details.router.traffic_pause_delay
                    },
                    fields: [
                        {
                            key: 'strategy',
                            type: 'details',
                            templateOptions: {label: 'Strategy : '}
                        },
                        {
                            key: 'send_attempt',
                            type: 'details',
                            templateOptions: {label: 'Send_attempt : '}
                        },
                        {
                            key: 'send_delay',
                            type: 'details',
                            templateOptions: {label: 'Send_delay : '}
                        },
                        {
                            key: 'traffic_stop_delay',
                            type: 'details',
                            templateOptions: {label: 'Traffic_stop_delay : '}
                        },
                        {
                            key: 'traffic_pause_delay',
                            type: 'details',
                            templateOptions: {label: 'Traffic_pause_delay : '}
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
                                    key: 'strategy',
                                    className: 'flex-xs-100 flex-sm-100 flex-50',
                                    type: 'input',
                                    templateOptions: {label: 'Strategy : ', 'required': true}
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
                                    key: 'send_attempt',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Send_attempt : ', 'required': true}
                                },
                                {
                                    key: 'send_delay',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Send_delay : ', 'required': true}
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
                                    key: 'traffic_stop_delay',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Traffic_stop_delay : ', 'required': true}
                                },
                                {
                                    key: 'traffic_pause_delay',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Traffic_pause_delay : ', 'required': true}
                                }
                            ]
                        }
                    ]
                },

                /* Registry Client Configuration */
                {
                    span: {row: 3, col: 2},
                    background: 'darkBlue',
                    color: 'colorBlack',
                    title: 'Registry Client Configuration',
                    model: {
                        registry_implementation: vm.details.registry.registry_implementation,
                        registry_parameters: '',
                        map_cache: '',
                        max_size: vm.details.registry.registry_parameters.map_cache.max_size
                    },
                    fields: [
                        {
                            key: 'registry_implementation',
                            type: 'details',
                            templateOptions: {label: 'Registry_implementation : '}
                        },
                        {
                            key: 'registry_parameters',
                            type: 'details',
                            templateOptions: {label: 'Registry_parameters : '}
                        },
                        {
                            key: 'map_cache',
                            type: 'details',
                            templateOptions: {label: '--> Map_cache : '}
                        },
                        {
                            key: 'max_size',
                            type: 'details',
                            templateOptions: {label: '-----> Max_size : '}
                        }
                    ],
                    fieldsModal: [
                        {
                            elementAttributes: {
                                layout: 'column',
                                'layout-sm': 'column',
                                'layout-xs': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'registry_implementation',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'details',
                                    templateOptions: {label: 'Registry_implementation : '}
                                },
                                {
                                    key: 'registry_parameters',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'details',
                                    templateOptions: {label: 'Registry_parameters : '}
                                },
                                {
                                    key: 'map_cache',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'detailsSub',
                                    templateOptions: {labelSub: 'Map_cache : '}
                                },
                                {
                                    key: 'max_size',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Max_size : ', 'required': true}
                                }
                            ]
                        }
                    ]
                },
                /* System Recovery Service */
                {
                    span: {row: 2, col: 1},
                    background: 'lightPurple',
                    color: 'colorBlack',
                    title: 'System Recovery Service',
                    model: {
                        corepoolsize: vm.details.recovery.corepoolsize,
                        keepalivetime: vm.details.recovery.keepalivetime
                    },
                    fields: [
                        {
                            key: 'corepoolsize',
                            type: 'details',
                            templateOptions: {label: 'Corepoolsize : '}
                        },
                        {
                            key: 'keepalivetime',
                            type: 'details',
                            templateOptions: {label: 'Keepalivetime : '}
                        }
                    ],
                    fieldsModal: [
                        {
                            elementAttributes: {
                                layout: 'column',
                                'layout-sm': 'column',
                                'layout-xs': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'corepoolsize',
                                    type: 'intInput',
                                    templateOptions: {label: 'Corepoolsize : ', 'required': true}
                                },
                                {
                                    key: 'keepalivetime',
                                    type: 'intInput',
                                    templateOptions: {label: 'Keepalivetime : ', 'required': true}
                                }
                            ]
                        }
                    ]
                },
                /* Embedded Registry Server Extension */
                {
                    span: {row: 2, col: 1},
                    background: 'lightGreen',
                    color: 'colorBlack',
                    title: 'Embedded Registry Server Extension',
                    model: {
                        activation: vm.details.embedded_registry_overlay.activation,
                        port: vm.details.embedded_registry_overlay.port
                    },
                    fields: [
                        {
                            key: 'activation',
                            type: 'details',
                            templateOptions: {label: 'Activation : '}
                        },
                        {
                            key: 'port',
                            type: 'details',
                            templateOptions: {label: 'Port : '}
                        }
                    ],
                    fieldsModal: [
                        {
                            elementAttributes: {
                                layout: 'column',
                                'layout-sm': 'column',
                                'layout-xs': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'activation',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'switchCustom',
                                    defaultValue: true,
                                    templateOptions: {label: 'Activation : ', theme: 'cardCustom-theme'}
                                },
                                {
                                    key: 'port',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Port : ', 'required': true}
                                }
                            ]
                        }
                    ]
                },
                /* Autoloader Extension */
                {
                    span: {row: 2, col: 2},
                    background: 'yellow',
                    color: 'colorBlack',
                    title: 'Autoloader Extension',
                    model: {
                        activation: vm.details.autoloader.activation,
                        scan_period: vm.details.autoloader.scan_period,
                        path_install: vm.details.autoloader.path_install,
                        path_installed: vm.details.autoloader.path_installed
                    },
                    fields: [
                        {
                            key: 'activation',
                            type: 'details',
                            templateOptions: {label: 'Activation : '}
                        },
                        {
                            key: 'scan_period',
                            type: 'details',
                            templateOptions: {label: 'Scan_period : '}
                        },
                        {
                            key: 'path_install',
                            type: 'details',
                            templateOptions: {label: 'Path_install : '}
                        },
                        {
                            key: 'path_installed',
                            type: 'details',
                            templateOptions: {label: 'Path_installed : '}
                        }
                    ],
                    fieldsModal: [
                        {
                            elementAttributes: {
                                layout: 'column',
                                'layout-sm': 'column',
                                'layout-xs': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'activation',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'switchCustom',
                                    defaultValue: true,
                                    templateOptions: {label: 'Activation : ', theme: 'cardCustom-theme'}
                                },
                                {
                                    key: 'scan_period',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'intInput',
                                    templateOptions: {label: 'Scan_period : ', 'required': true}
                                },
                                {
                                    key: 'path_install',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Path_install : ', 'required': true}
                                },
                                {
                                    key: 'path_installed',
                                    className: 'flex-xs-100 flex-sm-100 flex-100',
                                    type: 'input',
                                    templateOptions: {label: 'Path_installed : ', 'required': true}
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
