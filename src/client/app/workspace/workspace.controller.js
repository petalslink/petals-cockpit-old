(function () {

    'use strict';

    angular.module('app.workspace')
        .controller('WorkspaceController', ControllerFunction)
        .service('dataWkspceService', dataWkspceService);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['dataWkspceService'];
    /* @ngInject */
    function ControllerFunction(dataWkspceService) {
        var vmWkspce = this;
        vmWkspce.dataNav = [
            {
                Locked: false,
                Label: 'Petals',
                UiSref: '.petals'
            },
            {
                Locked: false,
                Label: 'Service',
                UiSref: '.service'

            },
            {
                Locked: false,
                Label: 'Api',
                UiSref: '.api'

            }
        ];

        activate();

        function activate() {
            vmWkspce.infoSelected = dataWkspceService.getInfoSelect();

        }
    }

    dataWkspceService.$inject = [];
    /* @ngInject */
    function dataWkspceService() {

        var service = {
            setInfoSelect: setInfoSelect,
            getInfoSelect: getInfoSelect,
            storeStateInfoSelect: storeStateInfoSelect,
            resetStateInfoSelect: resetStateInfoSelect
        };

        var infoSelect = {};

        return service;

        function setInfoSelect(selection) {
            infoSelect.value = selection;
        }

        function storeStateInfoSelect(stateName) {
            infoSelect[stateName] = infoSelect.value;
        }

        function resetStateInfoSelect(stateName) {
            infoSelect.value = infoSelect[stateName];
        }

        function getInfoSelect() {
            return infoSelect;
        }

    }

})();
