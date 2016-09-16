(function () {
    'use strict';

    angular
        .module('app.petals')
        .controller('PetalsController', ControllerFunction);


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$state', '$mdDialog', 'logger', 'workspaceData', 'petalsService', '$stateParams',
        'dataservice'];

    /* @ngInject */
    function ControllerFunction($state, $mdDialog, logger, workspaceData, petalsService, $stateParams, dataservice) {
        var vmPetals = this;

        vmPetals.data = {};
        vmPetals.selectedChild = null;
        vmPetals.choiceList = [];

        vmPetals.addTreeComponent = function (component) {
            addTreeComponent(component);
        };
        vmPetals.changeTitle = function (component) {
            changeTitle(component);
        };
        vmPetals.deleteTreeComponent = function (component) {
            deleteTreeComponent(component);
        };
        vmPetals.mayAddSubComponent = function (component) {
            return component.mayAddSubComponent;
        };
        vmPetals.moveDown = function (component) {
            moveDown(component);
        };
        vmPetals.moveUp = function (component) {
            moveUp(component);
        };
        vmPetals.gotoComponentState = function (component) {
            gotoComponentState(component);
        };
        vmPetals.toggleMinimized = function (component) {
            toggleMinimized(component);
        };

        activate();

        // **** functions ****

        function activate() {
            // init data with resolve from router
            vmPetals.data = workspaceData;

            // select component depending on url
            var id = petalsService.getSelectedComponentId();
            selectComponentById(id);
        }

        function selectComponentById(id) {
            if (id) {
                var selectedChild = vmPetals.data.getComponentById(id);

                if (selectedChild) {
                    // unselect previous selected component
                    if (vmPetals.selectedChild) {
                        vmPetals.selectedChild.selected = false;
                    }
                    // set selected component
                    vmPetals.selectedChild = selectedChild;
                    vmPetals.selectedChild.selected = true;
                    //dataWkspceService.setInfoSelect(vmPetals.selectedChild.selectionChain);
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

        function addTreeComponent(component) {
            //todo add promise and mange error

            // Get list of sub-component if exist
            var choiceList = [];
            if (component.typeData) {
                for (var i = 0; i < component.typeData.contains.length; i++) {
                    choiceList[i] = component.typeData.contains[i].type;
                }
            } else {
                // componentType does'nt exist anymore due to configuration change
                // todo ?
                return;
            }

            $mdDialog.show({
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                templateUrl: 'src/client/app/workspace/petals/modals/add-component.html',
                locals: {
                    localParent: component,
                    localChoiceList: choiceList
                },
                controller: DialogController,
                controllerAs: 'vmModal'

            }).then(function (data) {
                component.children.push(data);
                component.display = 'open';


            });

            DialogController.$inject = ['$mdDialog', 'localParent', 'localChoiceList', 'workspaceservice'];
            /* @ngInject */
            function DialogController($mdDialog, localParent, localChoiceList, workspaceservice) {
                var vmModal = this;
                vmModal.parent = localParent;
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
                    var element = {};
                    element.name = vmModal.name;
                    element.type = vmModal.myChoice.name;
                    element.state = 'UNDEPLOYED';
                    element.parent = localParent.id;

                    workspaceservice.addWorkspaceElement(element).then(function (data) {
                        $mdDialog.hide(data);
                    }, function (err) {
                        // TODO show the error
                    });
                };

                activate();

                function activate() {
                    if (vmModal.choiceList.length === 1) {
                        vmModal.myChoice = vmModal.choiceList[0];
                        changeSelected();
                    }
                }

                function changeSelected() {
                    vmModal.name = vmModal.myChoice.name + '-';
                }
            }

        }

        function changeTitle(component) {

            $mdDialog.show({
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                templateUrl: 'src/client/app/workspace/petals/modals/change-name.html',
                locals: {localData: component},
                controller: DialogController,
                controllerAs: 'vmModal'
            }).then(function () {
                $mdDialog.hide();
            });

            DialogController.$inject = ['$mdDialog', 'localData', 'dataservice'];
            /* @ngInject */
            function DialogController($mdDialog, localData, dataservice) {
                var vmModal = this;
                vmModal.modalName = localData.name;

                vmModal.closeDialog = function () {
                    $mdDialog.cancel();
                };
                vmModal.validDialog = function () {
                    var element = {};
                    element.name = localData.name;
                    return dataservice.updateElement(element);
                };
            }
        }

        function deleteTreeComponent(component) {

            $mdDialog.show({
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                templateUrl: 'src/client/app/workspace/petals/modals/delete-component.html',
                locals: {localData: component},
                controller: DialogController,
                controllerAs: 'vmModal'
            }).then(function () {
                $mdDialog.hide();
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

            DialogController.$inject = ['$mdDialog', 'localData', 'dataservice'];
            /* @ngInject */
            function DialogController($mdDialog, localData, dataservice) {
                var vmModal = this;
                vmModal.modalName = localData.name;

                vmModal.closeDialog = function () {
                    $mdDialog.cancel();
                };
                vmModal.validDialog = function () {
                    dataservice.deleteElement(localData).then(function() {
                        $mdDialog.hide();
                    }, function () {
                        // TODO show error
                    });
                };
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

            // TODO what is this doing here?
            if (!component.typeData) {
                // component doesn't exist anymore due to configuration change
                //todo unselect this component and select the first component available
                component.mayAddSubComponent = false;
                /*
                 select(vmPetals.selectedChild);
                 */
                return;
            } else {
                component.mayAddSubComponent = !!component.typeData.contains;
            }

            // goto his state
            var nextState = '';
            if (component.lastState) {
                nextState = component.lastState;
            } else {
                nextState = component.typeData.type.state;
            }
            $state.go(nextState, {id: component.id}).then(function () {
                    // if success Set selection for Workspace
                    // TODO factor with petals.router.js on success selected component id
                    selectComponentById(component.id);
                    petalsService.setSelectedComponentId(component.id);
                }, function (e) {
                    // if error
                    logger.debug('petals.controller.js: failed go state !!!' + e);
                    component.selected = true;
                    vmPetals.selectedChild = component;
                    //dataWkspceService.setInfoSelect(component.selectionChain);
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
