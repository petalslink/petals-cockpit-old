(function () {
    'use strict';

    angular
        .module('app.petals')
        .controller('PetalsController', ControllerFunction);


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$rootScope', '$state', '$mdDialog', 'logger',
        'promiseData', 'promiseConfig', 'dataWkspceService', 'petalsService'];

    /* @ngInject */
    function ControllerFunction($rootScope, $state, $mdDialog, logger, promiseData,
                                promiseConfig, dataWkspceService, petalsService) {
        var vmPetals = this;

        vmPetals.data = {};
        vmPetals.configData = {};
        vmPetals.selectedChild = null;
        vmPetals.choiceList = [];

        vmPetals.addTreeComponent = function (component) {addTreeComponent(component);};
        vmPetals.changeTitle = function (component) {changeTitle(component);};
        vmPetals.deleteTreeComponent = function (component) {deleteTreeComponent(component);};
        vmPetals.getComponentById = function (id) {return getComponentById(id);};
        vmPetals.mayAddSubComponent = function (component) {return component.mayAddSubComponent;};
        vmPetals.moveDown = function (component) {moveDown(component);};
        vmPetals.moveUp = function (component) {moveUp(component);};
        vmPetals.gotoComponentState = function (component) {gotoComponentState(component);};
        vmPetals.toggleMinimized = function (component) {toggleMinimized(component);};

        $rootScope.$on('$stateChangeSuccess', function () {
            // select component depending on url
            var id = petalsService.getSelectedComponentId();
            selectComponentById(id);

        });

        activate();

        // **** functions ****

        function activate() {
            // init data with resolve from router
            vmPetals.data = promiseData;
            vmPetals.configData = promiseConfig;

            // select component depending on url
            var id = petalsService.getSelectedComponentId();
            selectComponentById(id);
        }


        function selectComponentById(id) {
            if (id > -1) {
                var selectedChild = getComponentById(id);

                if (selectedChild) {
                    // unselect previous sellected component
                    if (vmPetals.selectedChild) {
                        vmPetals.selectedChild.selected = false;
                    }
                    // set selected comonent
                    vmPetals.selectedChild = selectedChild;
                    vmPetals.selectedChild.selected = true;
                    dataWkspceService.setInfoSelect(vmPetals.selectedChild.selectionChain);
                } else {
                    var alert = $mdDialog.alert({
                        title: 'Attention',
                        textContent: 'The component ' + id + ' does not exist anymore',
                        ok: 'Close'
                    });
                    $mdDialog.show(alert).then(function () {
                        //goto First element if exist
                        if (vmPetals.data.children[0]) {
                            gotoComponentState(vmPetals.data.children[0]);
                        }
                    });
                }
            } else {
                //goto First element if exist
                if (vmPetals.data.children[0]) {
                    gotoComponentState(vmPetals.data.children[0]);
                }
            }
        }

        function getConfigComponentType(component) {
            return walk(vmPetals.configData);

            function walk(componentConfigData) {
                if (componentConfigData) {
                    if ((componentConfigData.componentType.name === component.componentType.name) &&
                        (componentConfigData.componentType.version === component.componentType.version) &&
                        (componentConfigData.componentType.cat === component.componentType.cat)) {
                        return componentConfigData;
                    } else {
                        if (componentConfigData.contains) {
                            for (var i = 0; i < componentConfigData.contains.length; i++) {
                                var searchInChild = walk(componentConfigData.contains[i]);
                                if (searchInChild) {
                                    return searchInChild;
                                }
                            }
                        }
                    }
                }
                return null;
            }
        }

        function addTreeComponent(component) {
            //todo add promise and mange error
            var componentType = getConfigComponentType(component);

            // Get list of sub-component if exist
            var choiceList = [];
            if (componentType) {
                for (var i = 0; i < componentType.contains.length; i++) {
                    choiceList[i] = {
                        'name': componentType.contains[i].componentType.name,
                        'version': componentType.contains[i].componentType.version,
                        'cat': componentType.contains[i].componentType.cat,
                        'subCat': componentType.contains[i].componentType.subCat,
                        'icon': componentType.contains[i].componentType.icon
                    };
                }
            } else {
                // componentType does'nt exist anymore due to configuration change
                // todo ?
                return;
            }
            var newComponent = {};
            newComponent.title = '';
            newComponent.cat = choiceList[0].cat;
            var parentTitle = component.title;

            $mdDialog.show({
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                templateUrl: 'src/client/app/workspace/petals/modals/add-component.html',
                locals: {
                    localNewComponent: newComponent,
                    localParentTitle: parentTitle,
                    localChoiceList: choiceList
                },
                controller: DialogController,
                controllerAs: 'vmModal'

            }).then(function () {
                // todo call a addComponent function
                component.children.push({
                    id: 999,
                    title: newComponent.title,
                    componentType: newComponent.componentType,
                    state: 'undeployed',
                    display: 'empty',
                    selectionChain: component.selectionChain + '/' + newComponent.title,
                    children: []
                });
                component.display = 'open';
            });

            DialogController.$inject = ['$mdDialog', 'localNewComponent', 'localParentTitle', 'localChoiceList'];
            /* @ngInject */
            function DialogController($mdDialog, localNewComponent, localParentTitle, localChoiceList) {
                var vmModal = this;
                vmModal.newComponent = localNewComponent;
                vmModal.parentTitle = localParentTitle;
                vmModal.choiceList = localChoiceList;
                vmModal.myChoice = {};
                vmModal.changeSelected = function () {
                    changeSelected();
                };
                vmModal.closeDialog = function () {
                    $mdDialog.cancel();
                };
                vmModal.hasChoice = function () {
                    return (vmModal.choiceList.length > 1);
                };
                vmModal.validDialog = function () {
                    $mdDialog.hide();
                };

                activate();

                function activate() {
                    if (vmModal.choiceList.length === 1) {
                        vmModal.myChoice = vmModal.choiceList[0];
                        changeSelected();
                    }
                }

                function changeSelected() {
                    vmModal.newComponent.title = vmModal.myChoice.name + '-';
                    vmModal.newComponent.componentType = vmModal.myChoice;
                }
            }

        }

        function changeTitle(component) {
            var data = {};
            data.title = component.title;

            $mdDialog.show({
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                templateUrl: 'src/client/app/workspace/petals/modals/change-name.html',
                locals: {localData: data},
                controller: DialogController,
                controllerAs: 'vmModal'
            }).then(function () {
                component.title = data.title;
            });

            DialogController.$inject = ['$mdDialog', 'localData'];
            /* @ngInject */
            function DialogController($mdDialog, localData) {
                var vmModal = this;
                vmModal.data = localData;
                vmModal.modalTitle = localData.title;
                vmModal.closeDialog = function () {
                    $mdDialog.cancel();
                };
                vmModal.validDialog = function () {
                    $mdDialog.hide();
                };

                activate();

                function activate() {
                }
            }
        }

        function deleteTreeComponent(component) {
            var data = {};
            data.title = component.title;

            $mdDialog.show({
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                templateUrl: 'src/client/app/workspace/petals/modals/delete-component.html',
                locals: {localData: data},
                controller: DialogController,
                controllerAs: 'vmModal'
            }).then(function () {
                function walk(target) {
                    var children = target.children;
                    var i;
                    if (children) {
                        i = children.length;
                        while (i--) {
                            if (children[i] === component) {
                                children.splice(i, 1);
                                return gotoComponentState(target);
                            } else {
                                walk(children[i]);
                            }
                        }
                    }
                }

                walk(vmPetals.data);
            });

            DialogController.$inject = ['$mdDialog', 'localData'];
            /* @ngInject */
            function DialogController($mdDialog, localData) {
                var vmModal = this;
                vmModal.modalTitle = localData.title;
                vmModal.closeDialog = function () {
                    $mdDialog.cancel();
                };
                vmModal.validDialog = function () {
                    $mdDialog.hide();
                };

                activate();

                function activate() {
                }

            }
        }

        function getComponentById(id) {
            return walk(vmPetals.data);

            function walk(componentData) {
                if (componentData) {
                    if (componentData.id === id) {
                        return componentData;
                    } else {
                        if (componentData.children) {
                            for (var i = 0; i < componentData.children.length; i++) {
                                var searchInChild = walk(componentData.children[i]);
                                if (searchInChild) {
                                    return searchInChild;
                                }
                            }
                        }
                    }
                }
                return null;
            }
        }

        function moveDown(component) {
            function walk(target) {
                var children = target.children,
                    i;
                if (children) {
                    i = children.length;
                    while (i--) {
                        if (children[i] === component) {
                            if (i === children.length - 1) {
                                return children;
                            } else {
                                children.splice(i, 1);
                                return children.splice(i + 1, 0, component);
                            }
                        } else {
                            walk(children[i]);
                        }
                    }
                }
            }

            walk(vmPetals.data);
        }

        function moveUp(component) {
            function walk(target) {
                var children = target.children,
                    i;
                if (children) {
                    i = children.length;
                    while (i--) {
                        if (children[i] === component) {
                            if (i === 0) {
                                return children;
                            } else {
                                children.splice(i, 1);
                                return children.splice((i - 1), 0, component);
                            }
                        } else {
                            walk(children[i]);
                        }
                    }
                }
            }

            walk(vmPetals.data);
        }

        function gotoComponentState(component) {
            // store data of previous selected component
            if (vmPetals.selectedChild) {
                vmPetals.selectedChild.selected = false;
                vmPetals.selectedChild.lastState = $state.current.name;
            }

            var componentType = getConfigComponentType(component);

            if (!componentType) {
                // component doesn't exist anymore due to configuration change
                //todo unselect this component and select the first component available
                component.mayAddSubComponent = false;
                /*
                 select(vmPetals.selectedChild);
                 */
                return;
            } else {
                component.mayAddSubComponent = (!componentType.contains) ? false : true;
            }
            // goto his state
            var nextState = '';
            if (component.lastState) {
                nextState = component.lastState;
            } else {
                nextState = componentType.initState;
            }
            $state.go(nextState, {id: component.id}).then(function () {
                    // if succes Set selection for Workspace
                    /*
                     petalsService.setSelectedComponentId(component.id);
                     */
                }, function () {
                    // if error
                    logger.debug('petals.controller.js: failed go state !!!');
                    component.selected = true;
                    vmPetals.selectedChild = component;
                    dataWkspceService.setInfoSelect(component.selectionChain);
                    //TODO manage plugin error
                    $state.go('home.workspace.petals.fallback-component', {id: component.id});
                }
            );
        }

        function toggleMinimized(component) {
            if (component.children.length === 0) {
                component.display = 'empty';
            } else {
                if (component.display === 'minimized' || (component.selected === false)) {
                    component.display = 'open';
                } else {
                    if ((component.selected === true)) {
                        component.display = 'minimized';
                    }
                }
            }
        }


    }

})();
