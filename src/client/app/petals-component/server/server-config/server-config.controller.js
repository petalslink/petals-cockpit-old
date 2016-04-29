(function () {
    'use strict';

    angular
        .module('app.configServer')
        .controller('ConfigServerController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['promiseDetails', 'configModalTile'];

    /* @ngInject */
    function ControllerFunction(promiseDetails, configModalTile) {

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

            vm.tiles = [
                {
                    span: {row: 1, col: 1},
                    background: 'imgGrid',
                    color: 'colorWhite',
                    title: 'Type',
                    datas: [
                        {title: 'Type :', value: vm.details.componentType.name},
                        {title: 'Version :', value: vm.details.componentType.version}
                    ]
                },
                {
                    span: {row: 1, col: 1},
                    background: 'yellow',
                    color: 'colorBlack',
                    title: vm.details.title,
                    datas: [
                        {title: 'State :', value: vm.details.state},
                        {title: 'Description :', value: vm.details.description}
                    ]
                },
                {
                    span: {row: 1, col: 1},
                    background: 'gray',
                    color: 'colorBlack',
                    title: 'Router',
                    datas: [
                        {title: 'Strategy :', value: vm.details.router.strategy},
                        {title: 'Send_attempt :', value: vm.details.router.send_attempt},
                        {title: 'Send_delay :', value: vm.details.router.send_delay},
                        {title: 'Traffic_stop_delay :', value: vm.details.router.traffic_stop_delay},
                        {title: 'Traffic_pause_delay :', value: vm.details.router.traffic_pause_delay}
                    ]
                },
                {
                    span: {row: 1, col: 1},
                    background: 'blue',
                    color: 'colorBlack',
                    title: 'Topology',
                    datas: [
                        {titleSub: 'Url :', value: vm.details.general.topology.url},
                        {title: 'Passphrase :', value: vm.details.general.topology.passphrase},
                        {title: 'Dynamic_lock_wait_time :', value: vm.details.general.topology.dynamic_lock_wait_time},
                        {titleSub: 'Pinger :'},
                        {
                            iconSub: 'mdicons:subdirectory-arrow-right',
                            sub: 'Start_delay :',
                            value: vm.details.general.topology.pinger.start_delay
                        },
                        {
                            iconSub: 'mdicons:subdirectory-arrow-right',
                            sub: 'Period_delay :',
                            value: vm.details.general.topology.pinger.period_delay
                        }
                    ]
                },
                {
                    span: {row: 1, col: 2},
                    background: 'darkBlue',
                    color: 'colorBlack',
                    title: 'Registry Client Configuration',
                    datas: [
                        {title: 'Registry_implementation :', value: vm.details.registry.registry_implementation},
                        {titleSub: 'Registry_parameters :'},
                        {iconSub: 'mdicons:subdirectory-arrow-right', sub: 'Map_cache :'},
                        {
                            iconSub: 'mdicons:subdirectory-arrow-right',
                            sub: 'Max_size :',
                            value: vm.details.registry.registry_parameters.map_cache.max_size
                        }
                    ]
                },
                {
                    span: {row: 1, col: 2},
                    background: 'green',
                    color: 'colorBlack',
                    title: 'General Properties',
                    datas: [
                        {title: 'Data_basedir :', value: vm.details.general.data_basedir},
                        {title: 'Repository_path :', value: vm.details.general.repository_path},
                        {title: 'Work_path :', value: vm.details.general.work_path},
                        {title: 'Log_config_file :', value: vm.details.general.log_config_file},
                        {title: 'Task_timeout :', value: vm.details.general.task_timeout}
                    ]
                },
                {
                    span: {row: 1, col: 1},
                    background: 'orange',
                    color: 'colorBlack',
                    title: 'Autoloader Extension',
                    datas: [
                        {title: 'Activation :', value: vm.details.autoloader.activation},
                        {title: 'Scan_period :', value: vm.details.autoloader.scan_period},
                        {title: 'Path_install :', value: vm.details.autoloader.path_install},
                        {title: 'Path_installed :', value: vm.details.autoloader.path_installed}
                    ]
                },
                {
                    span: {row: 1, col: 1},
                    background: 'gray',
                    color: 'colorBlack',
                    title: 'Artifact Repository Extension',
                    datas: [
                        {title: 'Activation :', value: vm.details.artifact_repository.activation},
                        {title: 'Path :', value: vm.details.artifact_repository.path}
                    ]
                },
                {
                    span: {row: 1, col: 1},
                    background: 'lightGreen',
                    color: 'colorBlack',
                    title: 'Embedded Registry Server Extension',
                    datas: [
                        {title: 'Activation :', value: vm.details.embedded_registry_overlay.activation},
                        {title: 'Port :', value: vm.details.embedded_registry_overlay.port}
                    ]
                },
                {
                    span: {row: 2, col: 1},
                    background: 'pink',
                    color: 'colorBlack',
                    title: 'Transporter Configuration',
                    datas: [
                        {titleSub: 'Queue :'},
                        {
                            iconSub: 'mdicons:subdirectory-arrow-right',
                            sub: 'Max_size :',
                            value: vm.details.transport.queue.max_size
                        },
                        {
                            iconSub: 'mdicons:subdirectory-arrow-right',
                            sub: 'Offering_timeout :',
                            value: vm.details.transport.queue.offering_timeout
                        },
                        {titleSub: 'Tcp :'},
                        {iconSub: 'mdicons:subdirectory-arrow-right', sub: 'Receivers :'},
                        {
                            iconSub: 'mdicons:menu-right',
                            sub1: 'Numbers :',
                            value: vm.details.transport.tcp.receivers.numbers
                        },
                        {
                            iconSub: 'mdicons:menu-right',
                            sub1: 'Keep_alive :',
                            value: vm.details.transport.tcp.receivers.keep_alive
                        },
                        {iconSub: 'mdicons:subdirectory-arrow-right', sub: 'Senders :'},
                        {
                            iconSub: 'mdicons:menu-right',
                            sub1: 'Numbers :',
                            value: vm.details.transport.tcp.senders.numbers
                        },
                        {
                            iconSub: 'mdicons:menu-right',
                            sub1: 'Connection_timeout :',
                            value: vm.details.transport.tcp.senders.connection_timeout
                        },
                        {
                            iconSub: 'mdicons:menu-right',
                            sub1: 'Timeout :',
                            value: vm.details.transport.tcp.senders.timeout
                        },
                        {
                            iconSub: 'mdicons:menu-right',
                            sub1: 'Evictor_delay :',
                            value: vm.details.transport.tcp.senders.evictor_delay
                        }
                    ]
                },
                {
                    span: {row: 1, col: 1},
                    background: 'red',
                    color: 'colorBlack',
                    title: 'Security Connection',
                    datas: [
                        {title: 'Host :', value: vm.details.host},
                        {title: 'Jmx_port :', value: vm.details.jmx_port},
                        {title: 'Transport_port :', value: vm.details.transport_port},
                        {title: 'User :', value: vm.details.user},
                        {title: 'Password :', value: vm.details.password}
                    ]
                },
                {
                    span: {row: 1, col: 2},
                    background: 'purple',
                    color: 'colorBlack',
                    title: 'SSL Connections',
                    datas: [
                        {title: 'Key_password :', value: vm.details.ssl.key_password},
                        {titleSub: 'Keystore :'},
                        {
                            iconSub: 'mdicons:subdirectory-arrow-right',
                            sub: 'File :',
                            value: vm.details.ssl.keystore.file
                        },
                        {
                            iconSub: 'mdicons:subdirectory-arrow-right',
                            sub: 'Password :',
                            value: vm.details.ssl.keystore.password
                        },
                        {titleSub: 'Truststore :'},
                        {
                            iconSub: 'mdicons:subdirectory-arrow-right',
                            sub: 'File :',
                            value: vm.details.ssl.truststore.file
                        },
                        {
                            iconSub: 'mdicons:subdirectory-arrow-right',
                            sub: 'Password :',
                            value: vm.details.ssl.truststore.password
                        }
                    ]
                },
                {
                    span: {row: 1, col: 1},
                    background: 'yellow',
                    color: 'colorBlack',
                    title: 'WS API Extension',
                    datas: [
                        {title: 'Activation :', value: vm.details.ws_api.activation},
                        {title: 'Listening_interface :', value: vm.details.ws_api.listening_interface},
                        {title: 'Http_port :', value: vm.details.ws_api.http_port},
                        {title: 'Http_path :', value: vm.details.ws_api.http_path}
                    ]
                },
                {
                    span: {row: 1, col: 1},
                    background: 'lightPurple',
                    color: 'colorBlack',
                    title: 'System Recovery Service',
                    datas: [
                        {title: 'Recovery :', value: vm.details.registry.registry_implementation},
                        {
                            iconSub: 'mdicons:subdirectory-arrow-right',
                            sub: 'Corepoolsize :',
                            value: vm.details.recovery.corepoolsize
                        },
                        {
                            iconSub: 'mdicons:subdirectory-arrow-right',
                            sub: 'Keepalivetime :',
                            value: vm.details.recovery.keepalivetime
                        }
                    ]
                }
            ];
        }


    }

})();
