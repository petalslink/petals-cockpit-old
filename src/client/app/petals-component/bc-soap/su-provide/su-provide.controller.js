(function () {

    'use strict';

    angular.module('petalsComponent.bc-soap.su-provide')
        .controller('SuProvideController', ControllerFunction);

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
                UiSref: '.overview'
            },
            {
                Locked: false,
                Label: 'Operation',
                Icon: 'details',
                UiSref: '.operation'
            },
            {
                Locked: false,
                Label: 'Config',
                Icon: 'settings',
                UiSref: '.config'

            }
        ];

        activate();

        function activate() {
        }
    }

})();
