(function () {
    'use strict';

    angular
        .module('app.configServer')
        .controller('ConfigServerController', ControllerFunction)
        .directive('inputClear', inputClear);

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

            vm.tiles.model = {
                state: vm.details.state
            };

            vm.tiles.options = {};

            vm.tiles = [
                /* TYPE */
                {
                    span: {row: 1, col: 1},
                    background: 'imgGrid',
                    title: 'Type',
                    fields: [
                        {
                            elementAttributes: {
                                layout: 'column',
                                'layout-sm': 'column'
                            },
                            fieldGroupModal: [
                                {
                                    key: 'type',
                                    className: 'flex',
                                    type: 'label',
                                    templateOptions: {
                                        label: vm.details.componentType.name,
                                        disabled: true
                                    }
                                },
                                {
                                    key: 'version',
                                    className: 'flex',
                                    type: 'label',
                                    templateOptions: {
                                        label: vm.details.componentType.version,
                                        disabled: true
                                    }
                                }
                            ]
                        },
                        {
                            elementAttributes: {
                                layout: 'column',
                                'layout-sm': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'type',
                                    className: 'layout-fill',
                                    type: 'detailsTitle',
                                    templateOptions: {
                                        label: 'Type'
                                    }
                                },
                                {
                                    key: 'name',
                                    className: 'layout-fill colorWhite',
                                    type: 'detailsCenter',
                                    templateOptions: {
                                        labelValue: vm.details.componentType.name
                                    }
                                },
                                {
                                    key: 'version',
                                    className: 'layout-fill colorWhite',
                                    type: 'detailsCenter',
                                    templateOptions: {
                                        label: 'Version : ',
                                        labelValue: vm.details.componentType.version
                                    }
                                }
                            ]
                        }
                    ]
                },
                /* TITLE COMPONENT */
                {
                    span: {row: 1, col: 1},
                    background: 'yellow',
                    title: vm.details.title,
                    fieldsModal: [
                        {
                            elementAttributes: {
                                layout: 'column',
                                'layout-sm': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'state',
                                    className: 'flex',
                                    type: 'input',
                                    templateOptions: {
                                        label: 'State : ',
                                        input: vm.details.state
                                    }
                                },
                                {
                                    key: 'description',
                                    className: 'flex',
                                    type: 'input',
                                    defaultValue: vm.details.description,
                                    templateOptions: {
                                        label: 'Description : '
                                    }
                                }
                            ]
                        }
                    ],
                    fields: [
                        {
                            elementAttributes: {
                                layout: 'column',
                                'layout-sm': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'title',
                                    className: 'flex',
                                    type: 'detailsTitle',
                                    templateOptions: {
                                        label: vm.details.title
                                    }
                                },
                                {
                                    key: 'state',
                                    className: 'flex',
                                    type: 'details',
                                    templateOptions: {
                                        label: 'State : ' + vm.details.state
                                    }
                                },
                                {
                                    key: 'description',
                                    className: 'flex',
                                    type: 'details',
                                    templateOptions: {
                                        label: 'Description : ' + vm.details.description
                                    }
                                }
                            ]
                        }
                    ]
                },
                /* ROUTER */
                {
                    span: {row: 1, col: 1},
                    background: 'gray',
                    title: 'Router',
                    fieldsModal: [
                        {
                            elementAttributes: {
                                layout: 'column',
                                'layout-sm': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'strategy',
                                    className: 'flex',
                                    type: 'input',
                                    templateOptions: {
                                        labelValue: vm.details.router.strategy
                                    }
                                },
                                {
                                    key: 'send_attempt',
                                    className: 'flex',
                                    type: 'input',
                                    templateOptions: {
                                        labelValue: vm.details.router.send_attempt
                                    }
                                },
                                {
                                    key: 'send_delay',
                                    className: 'flex',
                                    type: 'input',
                                    templateOptions: {
                                        labelValue: vm.details.router.send_delay
                                    }
                                },
                                {
                                    key: 'traffic_stop_delay',
                                    className: 'flex',
                                    type: 'input',
                                    templateOptions: {
                                        labelValue: vm.details.router.traffic_stop_delay
                                    }
                                },
                                {
                                    key: 'traffic_pause_delay',
                                    className: 'flex',
                                    type: 'input',
                                    templateOptions: {
                                        labelValue: vm.details.router.traffic_pause_delay
                                    }
                                }
                            ]
                        }
                    ],
                    fields: [
                        {
                            elementAttributes: {
                                layout: 'column',
                                'layout-sm': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'router',
                                    className: 'layout-fill',
                                    type: 'detailsTitle',
                                    templateOptions: {
                                        label: 'Router'
                                    }
                                },
                                {
                                    key: 'strategy',
                                    className: 'layout-fill',
                                    type: 'details',
                                    templateOptions: {
                                        label: 'Strategy : ',
                                        labelValue: vm.details.router.strategy
                                    }
                                },
                                {
                                    key: 'send_attempt',
                                    className: 'layout-fill',
                                    type: 'details',
                                    templateOptions: {
                                        label: 'Send_attempt : ',
                                        labelValue: vm.details.router.send_attempt
                                    }
                                },
                                {
                                    key: 'send_delay',
                                    className: 'layout-fill',
                                    type: 'details',
                                    templateOptions: {
                                        label: 'Send_delay : ',
                                        labelValue: vm.details.router.send_delay
                                    }
                                },
                                {
                                    key: 'traffic_stop_delay',
                                    className: 'layout-fill',
                                    type: 'details',
                                    templateOptions: {
                                        label: 'Traffic_stop_delay : ',
                                        labelValue: vm.details.router.traffic_stop_delay
                                    }
                                },
                                {
                                    key: 'traffic_pause_delay',
                                    className: 'layout-fill',
                                    type: 'details',
                                    templateOptions: {
                                        label: 'Traffic_pause_delay : ',
                                        labelValue: vm.details.router.traffic_pause_delay
                                    }
                                }
                            ]
                        }
                    ]
                },
                /* TOPOLOGY */
                {
                    span: {row: 1, col: 1},
                    background: 'blue',
                    title: 'Topology',
                    fields: [
                        {
                            elementAttributes: {
                                layout: 'column',
                                'layout-sm': 'column'
                            },
                            fieldGroup: [
                                {
                                    key: 'topology',
                                    className: 'layout-fill',
                                    type: 'detailsTitle',
                                    templateOptions: {
                                        label: 'Topology'
                                    }
                                },
                                {
                                    key: 'url',
                                    className: 'layout-fill',
                                    type: 'details',
                                    templateOptions: {
                                        label: 'Url : '
                                    }
                                },
                                {
                                    key: 'send_attempt',
                                    className: 'layout-fill',
                                    type: 'details',
                                    templateOptions: {
                                        label: 'Passphrase : ',
                                        labelValue: vm.details.general.topology.dynamic_lock_wait_time
                                    }
                                },
                                {
                                    key: 'pinger',
                                    className: 'layout-fill',
                                    type: 'details',
                                    templateOptions: {
                                        label: 'Pinger : '
                                    }
                                },
                                {
                                    key: 'start_delay',
                                    className: 'layout-fill',
                                    type: 'details',
                                    templateOptions: {
                                        labelSub: 'Start_delay : ',
                                        labelValue: vm.details.general.topology.pinger.start_delay
                                    }
                                },
                                {
                                    key: 'period_delay',
                                    className: 'layout-fill',
                                    type: 'details',
                                    templateOptions: {
                                        labelSub: 'Period_delay : ',
                                        labelValue: vm.details.general.topology.pinger.period_delay
                                    }
                                }
                            ]
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
                        {iconSub: 'mdicons:subdirectory-arrow-right', subEmpty: 'Receivers :'},
                        {
                            iconSub1: 'mdicons:menu-right',
                            sub1: 'Numbers :',
                            value: vm.details.transport.tcp.receivers.numbers
                        },
                        {
                            iconSub1: 'mdicons:menu-right',
                            sub1: 'Keep_alive :',
                            value: vm.details.transport.tcp.receivers.keep_alive
                        },
                        {iconSub: 'mdicons:subdirectory-arrow-right', subEmpty: 'Senders :'},
                        {
                            iconSub1: 'mdicons:menu-right',
                            sub1: 'Numbers :',
                            value: vm.details.transport.tcp.senders.numbers
                        },
                        {
                            iconSub1: 'mdicons:menu-right',
                            sub1: 'Connection_timeout :',
                            value: vm.details.transport.tcp.senders.connection_timeout
                        },
                        {
                            iconSub1: 'mdicons:menu-right',
                            sub1: 'Timeout :',
                            value: vm.details.transport.tcp.senders.timeout
                        },
                        {
                            iconSub1: 'mdicons:menu-right',
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

            vm.originalFields = angular.copy(vm.tiles.fieldsModal);

            // function definition
            function onSubmit() {
                vm.tiles.options.updateInitialValue();
                logger.info(JSON.stringify(vm.tiles.model), null, 2);
            }
        }


    }

    // ----- directiveFunction -----
    inputClear.$inject = [];

    /* @ngInject */
    function inputClear() {
        return {
            restrict: 'A',
            compile: function (element, attrs) {
                var color = attrs.inputClear;
                var style = color ? 'color:' + color + ';' : '';
                var action = attrs.ngModel + ' = ';
                element.after(
                    '<md-button class="animate-show md-icon-button md-accent"' +
                    'ng-show="' + attrs.ngModel + '" ng-click="' + action + '"' +
                    'style="position: absolute; top: 0px; right: -6px; margin: 13px 0px;">' +
                    '<div style="' + style + '">x</div>' +
                    '</md-button>');
            }
        };
    }

})();
