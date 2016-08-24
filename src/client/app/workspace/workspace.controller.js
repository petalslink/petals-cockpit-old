(function () {

    'use strict';

    angular.module('app.workspace')
        .controller('WorkspaceController', ControllerFunction)
        .factory('dataWkspceService', dataWkspceService);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$stateParams'];
    /* @ngInject */
    function ControllerFunction($stateParams) {
        var vmWkspce = this;

        vmWkspce.details = {};

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
            vmWkspce.details = $stateParams.element;
            //vmWkspce.infoSelected = dataWkspceService.getInfoSelect();

            vmWkspce.$onInit = function() {
                vmWkspce.selectionMenu = vmWkspce.dataNav[0];
            };

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
