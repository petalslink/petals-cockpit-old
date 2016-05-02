(function () {
    'use strict';

    angular
        .module('app.layout')
        .service('configModalTile', serviceFunction);


    // ----- directiveFunction -----
    serviceFunction.$inject = ['$mdDialog'];

    /* @ngInject */
    function serviceFunction($mdDialog) {


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
            }).then(function () {

            });

            DialogController.$inject = ['$mdDialog', 'localData'];
            /* @ngInject */
            function DialogController($mdDialog, localData) {
                var vmModal = this;
                
                vmModal.tile = localData;

                vmModal.closeDialog = function () {
                    $mdDialog.cancel();
                };
                vmModal.validDialog = function () {
                    $mdDialog.hide();
                };
            }

        }
    }

})();
