'use strict';

function PetalsCtrl($scope, $mdDialog) {
    $scope.json = '';
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
    $scope.selectedChild = $scope.data.children[0];
    $scope.selectedChild.selected = 'true';

    $scope.getJson = function () {
        $scope.json = angular.toJson($scope.data);
    };

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

    $scope.addChild = function (child) {

        switch (child.type) {
            case 'BUS':
                $scope.formChildData.title = 'SERVER- ';
                $scope.formChildData.type = 'SERVER';
                $scope.formChildData.icon = 'dock';
                $scope.choiceList = $scope.serverConfigTypeList[0].serverTypeList;

                break;
            case 'SERVER':
                $scope.formChildData.title = 'BC- SE-';
                $scope.formChildData.type = 'COMPONENT';
                $scope.formChildData.icon = 'extension';
                $scope.choiceList = $scope.componentTypeList;
                break;
            case 'COMPONENT':
                $scope.formChildData.title = 'SU- SERVICE-';
                $scope.formChildData.type = 'SU';
                $scope.formChildData.icon = 'stars';
                $scope.choiceList = $scope.suTypeList;
                break;
            default:
                $scope.formChildData.title = 'BUS- ';
                $scope.formChildData.type = 'BUS';
                $scope.formChildData.icon = 'directions_bus';
                $scope.choiceList = $scope.busTypeList;
        }
        $scope.formChildData.affichage = 'vide';
        $scope.parentTitle = child.title;


        $mdDialog.show({
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            templateUrl: '/petals-view/modals/addBranch.html',
            locals: {
                formChildData: $scope.formChildData,
                parentTitle: $scope.parentTitle,
                choiceList: $scope.choiceList
            },
            controller: function DialogController($scope, $mdDialog, formChildData, parentTitle, choiceList) {

                $scope.formChildData = formChildData;
                $scope.parentTitle = parentTitle;
                $scope.choiceList = choiceList;
                $scope.myChoice = '';
                if ($scope.choiceList.length === 1) {
                    $scope.myChoice = $scope.choiceList[0];
                    changeSelected();
                }

                console.log(angular.toJson($scope.choiceList));
                console.log(angular.toJson($scope.myChoice));

                $scope.hasChoice = function () {
                    if ($scope.choiceList.length === 1) {
                        return false;
                    }
                    return true;
                };


                $scope.changeSelected = function () {
                    changeSelected();
                };


                function changeSelected() {
                    $scope.formChildData.componentType = $scope.myChoice;
                    switch ($scope.formChildData.type) {
                        case 'BUS':
                            $scope.formChildData.title = 'BUS-(' + $scope.formChildData.componentType.name + ')';
                            break;
                        case 'SERVER':
                            $scope.formChildData.title = $scope.formChildData.componentType.name + '-';
                            break;
                        case 'COMPONENT':
                            $scope.formChildData.title = $scope.formChildData.componentType.name + '-';
                            break;
                        default:
                            $scope.formChildData.title = 'SU-' + $scope.formChildData.componentType.name + '-';
                    }
                }

                $scope.closeDialog = function () {
                    $mdDialog.cancel();
                };
                $scope.validDialog = function () {
                    $mdDialog.hide();
                };
            }

        }).then(function () {

            if ($scope.formChildData.type === 'COMPONENT') {
                child.children.push({
                    title: $scope.formChildData.title,
                    type: $scope.formChildData.type,
                    icon: $scope.formChildData.icon,
                    affichage: $scope.formChildData.affichage,
                    componentType: $scope.formChildData.componentType,
                    children: []
                });
            } else {
                child.children.push({
                    title: $scope.formChildData.title,
                    type: $scope.formChildData.type,
                    icon: $scope.formChildData.icon,
                    affichage: $scope.formChildData.affichage,
                    children: []
                });
            }
            child.affichage = 'details'
            console.log(angular.toJson($scope.data));

            $scope.formChildData.title = '';
            $scope.formChildData.componentType = '';

        });
    };

    $scope.isSU = function (child) {
        return (child.type === 'SU');
    };

    $scope.changeName = function (child) {

        $scope.formChildData.title = child.title;
        $mdDialog.show({
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            templateUrl: '/petals-view/modals/changeName.html',
            locals: {formChildData: $scope.formChildData},
            controller: function DialogController($scope, $mdDialog, formChildData) {

                $scope.formChildData = formChildData;
                $scope.title = formChildData.title;

                $scope.closeDialog = function () {
                    $mdDialog.cancel();
                };
                $scope.validDialog = function () {
                    $mdDialog.hide();
                };
            }

        }).then(function () {
            child.title = $scope.formChildData.title;
            console.log(angular.toJson($scope.data));

            $scope.formChildData.title = '';
        });
    };

    $scope.formChildData = {
        title: '',
        type: '',
        componentType: ''
    };

    $scope.deleteBranch = function (child) {

        $scope.formChildData.title = child.title;
        $mdDialog.show({
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            templateUrl: '/petals-view/modals/deleteBranch.html',
            locals: {formChildData: $scope.formChildData},
            controller: function DialogController($scope, $mdDialog, formChildData) {

                $scope.formChildData = formChildData;
                $scope.title = formChildData.title;

                $scope.closeDialog = function () {
                    $mdDialog.cancel();
                };
                $scope.validDialog = function () {
                    $mdDialog.hide();
                };
            }

        }).then(function () {
            function walk(target) {
                var children = target.children;
                var i;
                if (children) {
                    i = children.length;
                    while (i--) {
                        if (children[i] === child) {
                            return children.splice(i, 1);
                        } else {
                            walk(children[i])
                        }
                    }
                }
            }

            walk($scope.data);
            $scope.formChildData.title = '';

        });
    };

    $scope.formChildData = {
        title: '',
        type: '',
        componentType: ''
    };

    $scope.toggleMinimized = function (child) {
        if (child.children.length === 0) {
            child.affichage = 'vide';
        } else {
            if (child.affichage === 'minimized') {
                child.affichage = 'details'

            } else {
                child.affichage = 'minimized'
            }
        }
    };

    $scope.select = function (child) {
        if ($scope.selectedChild) {
            $scope.selectedChild.selected = false;
        }
        child.selected = true;
        $scope.selectedChild = child;
        console.log(angular.toJson($scope.data));
    };

    $scope.upChild = function (child) {
        function walk(target) {
            var children = target.children,
                i;
            if (children) {
                i = children.length;
                while (i--) {
                    if (children[i] === child) {
                        if (i == 0) {
                            return children;
                        } else {
                            children.splice(i, 1);
                            return children.splice((i - 1), 0, child);
                        }
                    } else {
                        walk(children[i])
                    }
                }
            }
        }

        walk($scope.data);
    };

    $scope.downChild = function (child) {
        function walk(target) {
            var children = target.children,
                i;
            if (children) {
                i = children.length;
                while (i--) {
                    if (children[i] === child) {
                        if (i == children.length - 1) {
                            return children;
                        } else {
                            children.splice(i, 1);
                            return children.splice(i + 1, 0, child);
                        }
                    } else {
                        walk(children[i])
                    }
                }
            }
        }

        walk($scope.data);
    };

    $scope.update = function (event, ui) {

        var root = event.target,
            item = ui.item,
            parent = item.parent(),
            target = (parent[0] === root) ? $scope.data : parent.scope().child,
            child = item.scope().child,
            index = item.index();

        target.children || (target.children = []);

        function walk(target, child) {
            var children = target.children,
                i;
            if (children) {
                i = children.length;
                while (i--) {
                    if (children[i] === child) {
                        return children.splice(i, 1);
                    } else {
                        walk(children[i], child);
                    }
                }
            }
        }

        walk($scope.data, child);

        target.children.splice(index, 0, child);
    };
}

PetalsCtrl.$inject = ['$scope','$mdDialog'];
module.exports = PetalsCtrl;