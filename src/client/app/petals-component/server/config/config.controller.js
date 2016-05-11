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

            // funcation assignment
            vm.onSubmit = onSubmit;

            vm.tiles = [
                /* State */
                {
                    span: {row: 2, col: 1},
                    background: 'yellow',
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
                            key: 'state',
                            type: 'detailsCenter',
                            templateOptions: {}
                        },
                        {
                            key: 'name',
                            type: 'input',
                            templateOptions: {
                                label: 'Name : '
                            }
                        },
                        {
                            key: 'description',
                            type: 'input',
                            templateOptions: {
                                label: 'Description : '
                            }
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
                            key: 'name',
                            type: 'detailsCenter',
                            templateOptions: {}
                        },
                        {
                            key: 'version',
                            type: 'detailsCenter',
                            templateOptions: {
                                label: 'Version : '
                            }
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
                            type: 'details',
                            templateOptions: {
                                label: 'Password : '
                            }
                        }
                    ],
                    fieldsModal: [
                        {
                            key: 'host',
                            type: 'input',
                            templateOptions: {
                                label: 'Host : '
                            }
                        },
                        {
                            key: 'jmx_port',
                            type: 'input',
                            templateOptions: {
                                label: 'Jmx_port : '
                            }
                        },
                        {
                            key: 'transport_port',
                            type: 'input',
                            templateOptions: {
                                label: 'Transport_port : '
                            }
                        },
                        {
                            key: 'user',
                            type: 'input',
                            templateOptions: {
                                label: 'User : '
                            }
                        },
                        {
                            key: 'password',
                            type: 'input',
                            templateOptions: {
                                label: 'Password : '
                            }
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
                    fieldsModal: [
                        {
                            key: 'url',
                            type: 'input',
                            templateOptions: {label: 'Url : '}
                        },
                        {
                            key: 'passphrase',
                            type: 'input',
                            templateOptions: {label: 'Passphrase : '}
                        },
                        {
                            key: 'dynamic_lock_wait_time',
                            type: 'input',
                            templateOptions: {label: 'Dynamic_lock_wait_time : '}
                        },
                        {
                            key: 'pinger',
                            type: 'details',
                            templateOptions: {label: 'Pinger : '}
                        },
                        {
                            key: 'start_delay',
                            type: 'input',
                            templateOptions: {label: 'Start_delay : '}
                        },
                        {
                            key: 'period_delay',
                            type: 'input',
                            templateOptions: {label: 'Period_delay : '}
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
                            key: 'data_basedir',
                            type: 'input',
                            templateOptions: {label: 'Data_basedir : '}
                        },
                        {
                            key: 'repository_path',
                            type: 'input',
                            templateOptions: {label: 'Repository_path : '}
                        },
                        {
                            key: 'work_path',
                            type: 'input',
                            templateOptions: {label: 'Work_path : '}
                        },
                        {
                            key: 'log_config_file',
                            type: 'input',
                            templateOptions: {label: 'Log_config_file : '}
                        },
                        {
                            key: 'task_timeout',
                            type: 'input',
                            templateOptions: {label: 'Task_timeout : '}
                        },
                        {
                            key: 'exchange_validation',
                            type: 'input',
                            templateOptions: {label: 'Exchange_validation : '}
                        },
                        {
                            key: 'classloaders_isolated',
                            type: 'input',
                            templateOptions: {label: 'Classloaders_isolated : '}
                        },
                        {
                            key: 'container_moves_lock_wait_time',
                            type: 'input',
                            templateOptions: {label: 'Container_moves_lock_wait_time : '}
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
                            type: 'details',
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
                            type: 'details',
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
                            type: 'details',
                            templateOptions: {label: '--> Password : '}
                        }
                    ],
                    fieldsModal: [
                        {
                            key: 'key_password',
                            type: 'input',
                            templateOptions: {label: 'Key_password : '}
                        },
                        {
                            key: 'keystore',
                            type: 'details',
                            templateOptions: {label: 'Keystore : '}
                        },
                        {
                            key: 'keystore_file',
                            type: 'input',
                            templateOptions: {label: '--> File : '}
                        },
                        {
                            key: 'keystore_password',
                            type: 'input',
                            templateOptions: {label: '--> Password : '}
                        },
                        {
                            key: 'truststore',
                            type: 'details',
                            templateOptions: {label: 'Truststore : '}
                        },
                        {
                            key: 'truststore_file',
                            type: 'input',
                            templateOptions: {label: '--> File : '}
                        },
                        {
                            key: 'truststore_password',
                            type: 'input',
                            templateOptions: {label: '--> Password : '}
                        }
                    ]
                },
                /* Transporter Configuration */
                {
                    span: {row: 4, col: 1},
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
                            key: 'queue',
                            type: 'details',
                            templateOptions: {label: 'Queue : '}
                        },
                        {
                            key: 'max_size',
                            type: 'input',
                            templateOptions: {label: 'Max_size : '}
                        },
                        {
                            key: 'offering_timeout',
                            type: 'input',
                            templateOptions: {label: 'Offering_timeout : '}
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
                            type: 'input',
                            templateOptions: {label: 'Listening_interface : '}
                        },
                        {
                            key: 'tcp_receivers_numbers',
                            type: 'input',
                            templateOptions: {label: 'Numbers : '}
                        },
                        {
                            key: 'tcp_receivers_keep_alive',
                            type: 'input',
                            templateOptions: {label: 'Keep_alive : '}
                        },
                        {
                            key: 'senders',
                            type: 'details',
                            templateOptions: {label: '--> Senders : '}
                        },
                        {
                            key: 'tcp_senders_numbers',
                            type: 'input',
                            templateOptions: {label: 'Numbers : '}
                        },
                        {
                            key: 'tcp_senders_connection_timeout',
                            type: 'input',
                            templateOptions: {label: 'Connection_timeout : '}
                        },
                        {
                            key: 'tcp_senders_timeout',
                            type: 'input',
                            templateOptions: {label: 'Timeout : '}
                        },
                        {
                            key: 'tcp_senders_evictor_delay',
                            type: 'input',
                            templateOptions: {label: 'Evictor_delay : '}
                        }
                    ]
                },
                /* Router */
                {
                    span: {row: 2, col: 1},
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
                            key: 'strategy',
                            type: 'input',
                            templateOptions: {label: 'Strategy : '}
                        },
                        {
                            key: 'send_attempt',
                            type: 'input',
                            templateOptions: {label: 'Send_attempt : ', type: 'integer'}
                        },
                        {
                            key: 'send_delay',
                            type: 'input',
                            templateOptions: {label: 'Send_delay : '}
                        },
                        {
                            key: 'traffic_stop_delay',
                            type: 'input',
                            templateOptions: {label: 'Traffic_stop_delay : '}
                        },
                        {
                            key: 'traffic_pause_delay',
                            type: 'input',
                            templateOptions: {label: 'Traffic_pause_delay : '}
                        }
                    ]
                },
                /* Registry Client Configuration */
                {
                    span: {row: 2, col: 2},
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
                            key: 'registry_implementation',
                            type: 'input',
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
                            type: 'input',
                            templateOptions: {label: 'Max_size : '}
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
                            key: 'corepoolsize',
                            type: 'input',
                            templateOptions: {label: 'Corepoolsize : '}
                        },
                        {
                            key: 'keepalivetime',
                            type: 'input',
                            templateOptions: {label: 'Keepalivetime : '}
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
                            key: 'activation',
                            type: 'input',
                            templateOptions: {label: 'Activation : '}
                        },
                        {
                            key: 'port',
                            type: 'input',
                            templateOptions: {label: 'Port : '}
                        }
                    ]
                },
                /* Autoloader Extension */
                {
                    span: {row: 2, col: 2},
                    background: 'orange',
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
                            key: 'activation',
                            type: 'input',
                            templateOptions: {label: 'Activation : '}
                        },
                        {
                            key: 'scan_period',
                            type: 'input',
                            templateOptions: {label: 'Scan_period : '}
                        },
                        {
                            key: 'path_install',
                            type: 'input',
                            templateOptions: {label: 'Path_install : '}
                        },
                        {
                            key: 'path_installed',
                            type: 'input',
                            templateOptions: {label: 'Path_installed : '}
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
