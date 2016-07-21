(function () {
    'use strict';

    angular
        .module('app.layout')
        .service('configModalTile', serviceFunction);


    // ----- directiveFunction -----
    serviceFunction.$inject = ['$mdDialog', 'logger'];

    /* @ngInject */
    function serviceFunction($mdDialog, logger) {


        var service = {
            openModalTile: openModalTile
        };

        return service;

        function openModalTile(tile) {

            $mdDialog.show({
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                templateUrl: 'src/client/app/layout/config-modal.html',
                locals: {localData: tile},
                controller: DialogController,
                controllerAs: 'vmModal'
            }).catch(function() {
                // reset data when exit without update
                tile.options.resetModel();
            });

            DialogController.$inject = ['$mdDialog', 'localData', 'dataservice', '$stateParams'];
            /* @ngInject */
            function DialogController($mdDialog, localData, dataservice, $stateParams) {
                var vmModal = this;

                vmModal.tile = localData;

                vmModal.closeDialog = function () {
                    $mdDialog.cancel();
                };
                vmModal.validDialog = function () {
                    var element = {};
                    element.id = $stateParams.id;
                    element.config = localData.model;
                    return dataservice.updateElement(element)
                        .then(function() {
                            $mdDialog.hide();
                        }, function(res) {
                            logger.error('Impossible to update element: '+res);
                        });
                };
            }

        }
    }

})();
