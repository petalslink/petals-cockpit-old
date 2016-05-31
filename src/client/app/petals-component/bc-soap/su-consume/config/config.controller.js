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
