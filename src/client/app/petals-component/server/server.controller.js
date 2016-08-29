(function () {

    'use strict';

    angular.module('petalsComponent.server')
        .controller('ServerController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = [];

    /* @ngInject */
    function ControllerFunction() {

        var vm = this;

        activate();

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
                Label: 'Monitor',
                Icon: 'shuffle',
                UiSref: '.monitor'
            },
            {
                Locked: false,
                Label: 'Config',
                Icon: 'settings',
                UiSref: '.config'
            },
            {
                Locked: false,
                Label: 'Log',
                Icon: 'security',
                UiSref: '.log'
            },
            {
                Locked: false,
                Label: 'Flow',
                Icon: 'trending-up',
                UiSref: '.flow'
            },
            {
                Locked: false,
                Label: 'User',
                Icon: 'account-network',
                UiSref: '.user'
            }
        ];

        function activate() {
        }
    }

})();
