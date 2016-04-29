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


        function openModalTile() {

            $mdDialog.show({
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                templateUrl: 'src/client/app/layout/config-modal.html',
                controller: DialogController,
                controllerAs: 'vmModal'
            }).then(function () {

            });

            DialogController.$inject = ['$mdDialog'];
            /* @ngInject */
            function DialogController($mdDialog) {
                var vmModal = this;

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
