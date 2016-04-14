(function () {
    'use strict';

    angular
        .module('app.petals')
        .controller('PetalsController', ControllerFunction);


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$state', '$mdDialog', 'logger', 'promiseData', 'promiseConfig','dataWkspceService'];

    /* @ngInject */
    function ControllerFunction($state, $mdDialog, logger, promiseData, promiseConfig, dataWkspceService) {
        var vmPetals = this;

        vmPetals.data = {};
        vmPetals.configData = {};
        vmPetals.selectedChild = null;
        vmPetals.choiceList = [];

        vmPetals.addTreeComponent = function (component) { addTreeComponent(component); };
        vmPetals.changeTitle = function (component) { changeTitle(component); };
        vmPetals.deleteTreeComponent = function (component) { deleteTreeComponent(component); };
        vmPetals.mayAddSubComponent = function (component) { return component.mayAddSubComponent; };
        vmPetals.moveDown = function (component) { moveDown(component); };
        vmPetals.moveUp = function (component) { moveUp(component); };
        vmPetals.select = function (component) { select(component); };
        vmPetals.toggleMinimized = function (component) { toggleMinimized(component); };

        /*
         $scope.$on('$stateNotFound',
         function(event, unfoundState){
         logger.debug(' petals.controller.js -  unfoundstate.to: '+ unfoundState.to +
         ' - Params: ' + unfoundState.toParams + ' - Options: ' +unfoundState.options);
         //todo allert user that no plud-in for this component is found o redirect to an null component
         // that tells user plug-in is not avialable for this component
         select(vmPetals.selectedChild);
         });
         */

        activate();

        // **** functions ****

        function activate() {
            // init data with resolve from router
            vmPetals.data = promiseData;
            vmPetals.configData = promiseConfig;

            //goto First element if exist
            if (vmPetals.data.children[0]) {
                select(vmPetals.data.children[0]);
            }

        }

        function getConfigComponentType(component) {
            return walk(vmPetals.configData);

            function walk(componentConfigData) {
                if (componentConfigData) {
                    if ((componentConfigData.name === component.componentType.name) &&
                        (componentConfigData.version === component.componentType.version) &&
                        (componentConfigData.cat === component.componentType.cat) ) {
                        return componentConfigData;
                    } else {
                        if (componentConfigData.contains){
                            for( var i = 0; i < componentConfigData.contains.length; i++) {
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
            if(componentType) {
                for (var i = 0; i < componentType.contains.length; i++) {
                    choiceList[i] = {
                        'name' : componentType.contains[i].name,
                        'version': componentType.contains[i].version,
                        'cat': componentType.contains[i].cat,
                        'subCat': componentType.contains[i].subCat,
                        'icon': componentType.contains[i].icon
                        };
                }
            } else {
                // componentType does'nt exist anymore due to configuration change
                select(component);
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
                controllerAs : 'vmModal'

            }).then(function () {
                // todo call a addComponent function
                component.children.push({
                    id: 999,
                    title: newComponent.title,
                    componentType: newComponent.componentType,
                    state: 'undeployed',
                    display: 'empty',
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
                vmModal.changeSelected = function () { changeSelected(); };
                vmModal.closeDialog = function () { $mdDialog.cancel(); };
                vmModal.hasChoice = function () { return (vmModal.choiceList.length > 1); };
                vmModal.validDialog = function () { $mdDialog.hide(); };

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
                controllerAs : 'vmModal'
            }).then(function () {
                component.title = data.title;
            });

            DialogController.$inject = ['$mdDialog', 'localData'];
            /* @ngInject */
            function DialogController($mdDialog, localData) {
                var vmModal = this;
                vmModal.data = localData;
                vmModal.modalTitle = localData.title;
                vmModal.closeDialog = function () { $mdDialog.cancel(); };
                vmModal.validDialog = function () { $mdDialog.hide(); };

                activate();

                function activate(){}
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
                controllerAs : 'vmModal'
            }).then(function () {
                function walk(target) {
                    var children = target.children;
                    var i;
                    if (children) {
                        i = children.length;
                        while (i--) {
                            if (children[i] === component) {
                                return children.splice(i, 1);
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
                vmModal.closeDialog = function () { $mdDialog.cancel(); };
                vmModal.validDialog = function () { $mdDialog.hide(); };

                activate();

                function activate(){}

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

        function select(component) {
            // store data of previous selected component
            if (vmPetals.selectedChild) {
                vmPetals.selectedChild.selected = false;
                vmPetals.selectedChild.lastState = $state.current.name;
            }

            var componentType = getConfigComponentType(component);

            if(!componentType) {
                // component doesn't exist anymore due to configuration change
                //todo unselect this component and select the first component available
                component.mayAddSubComponent = false;
                select(vmPetals.selectedChild);
                return;
            } else {
                if(!componentType.contains){
                    component.mayAddSubComponent = false;
                } else {
                    component.mayAddSubComponent = true;
                }
            }
            // Set selection for Workspace
            dataWkspceService.setInfoSelect(component.selectionChain);
            // goto his state
            var nextState ='';
            if (component.lastState) {
                nextState = component.lastState;
            } else {
                nextState = componentType.initState;
            }
            // todo use promise or call a gotoState function
            component.selected = true;
            vmPetals.selectedChild = component;
            $state.go(nextState,{id: component.id});
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
