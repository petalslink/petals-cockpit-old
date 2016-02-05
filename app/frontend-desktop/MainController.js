'use strict';
// Controller naming conventions should start with an uppercase letter
function MainCtrl($rootScope, $scope) {

    $scope.test = null;
    console.log('Up and running!');

    $scope.infoSelect = ' You Pick : ';

    $scope.data = {
        title: 'Workspace Demo',
        type: 'WKSPCE',
        cat: {name: 'Demo'},
        icon: 'folder_special',
        state: 'UNDEPLOYED',
        children: [{
            title: 'BUS 1',
            type: 'BUS',
            cat: {name: '4-3-3', filter: 'in-house'},
            icon: 'directions_bus',
            state: 'UNDEPLOYED',
            affichage: 'details',
            children: [
                {
                    title: 'server 1',
                    type: 'SERVER',
                    cat: {name: 'PetalsNode'},
                    icon: 'dock',
                    state: 'UNDEPLOYED',
                    affichage: 'vide',
                    children: []
                },
                {
                    title: 'server 2',
                    type: 'SERVER',
                    cat: {name: 'PetalsNode'},
                    icon: 'dock',
                    state: 'UNDEPLOYED',
                    affichage: 'vide',
                    children: []
                }]
        }]
    };
    $scope.selectedChild = {};
    $scope.selectedChild.value = $scope.data.children[0];
    $scope.selectedChild.value.selected = 'true';

    // have a tree config to build tree without switch case
    $scope.treeConfigList = [
        {
            type: 'WKSPCE',
            cat: {name: 'Demo'},
            icon: 'folder_special',
            stateList: ['STOPPED', 'ALERT', 'RUNNING', 'FULL'],
            filters: ['in-house', 'cloud'],
            choices: [
                {
                    type: 'BUS',
                    cat: {name: '4-3-3', filter: 'in-house'},
                    icon: 'directions_bus',
                    stateList: ['UNDEPLOYED', 'DEPLOYED', 'STOPPED', 'STARTED'],
                    childrenType: 'SERVER',
                    filters: [],
                    choices: [
                        {
                            type: 'SERVER',
                            cat: {name: '4-3-3', filter: 'in-house'},
                            icon: 'dock',
                            stateList: ['UNDEPLOYED', 'DEPLOYED', 'STOPPED', 'STARTED'],
                            filters: [],
                            choices: [
                                {
                                    type: 'COMPONENT',
                                    cat: {name: 'BC-SOAP', filter: 'BC'},
                                    icon: 'settings_input_composite',
                                    stateList: ['UNDEPLOYED', 'DEPLOYED', 'STOPPED', 'STARTED'],
                                    filters: [],
                                    choices: [
                                        {
                                            type: 'SU',
                                            cat: {name: 'Consume'},
                                            icon: 'input',
                                            stateList: ['UNDEPLOYED', 'DEPLOYED', 'STOPPED', 'STARTED'],
                                            filters: [],
                                            choices: []
                                        },
                                        {
                                            type: 'SU',
                                            cat: {name: 'Provide'},
                                            icon: 'input',
                                            stateList: ['UNDEPLOYED', 'DEPLOYED', 'STOPPED', 'STARTED'],
                                            filters: [],
                                            choices: []
                                        }


                                    ]

                                }

                            ]

                        }

                    ]

                }
            ]
        }
    ];

    $scope.busTypeList = [
        {name: '4-3-3', type: 'version'},
        {name: '5-0-0', type: 'version'}];

    $scope.serverConfigTypeList = [
        {
            name: '4-3-3',
            serverTypeList: [
                {name: 'PetalsNode', type: 'server'}]
        },
        {
            name: '5-0-0',
            serverTypeList: [
                {name: 'PetalsNode', type: 'server'},
                {name: 'Registry', type: 'server'},
                {name: 'Log', type: 'server'}]
        }
    ];

    $scope.componentTypeList = [
        {name: 'BC-SOAP', type: 'BC'},
        {name: 'BC-REST', type: 'BC'},
        {name: 'BC-MAIL', type: 'BC'},
        {name: 'SE-POJO', type: 'SE'},
        {name: 'SE-QUARTZ', type: 'SE'}];

    $scope.suTypeList = [
        {name: 'Provide', type: 'SU'},
        {name: 'Consume', type: 'SU'}];

}

// $inject is necessary for minification.
MainCtrl.$inject = ['$rootScope', '$scope'];
module.exports = MainCtrl;