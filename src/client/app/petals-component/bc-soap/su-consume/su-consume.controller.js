(function () {

    'use strict';

    angular.module('petalsComponent.bc-soap.su-consume')
        .controller('SuConsumeController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = [];

    /* @ngInject */
    function ControllerFunction() {
        var vm = this;

        // TABS VIEWS CONSOLE
        vm.dataNavConsole = [
            {
                Locked: false,
                Label: 'Overview',
                Icon: 'eye',
                UiSref: '.su-overview'
            },
            {
                Locked: false,
                Label: 'Operation',
                Icon: 'details',
                UiSref: '.su-operation'
            },
            {
                Locked: false,
                Label: 'Config',
                Icon: 'settings',
                UiSref: '.su-config'

            }
        ];

        activate();

        function activate() {
        }
    }

})();
