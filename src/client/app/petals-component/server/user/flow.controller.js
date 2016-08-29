(function () {
    'use strict';

    angular
        .module('petalsComponent.server.user')
        .controller('UserServerController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['elementData'];

    /* @ngInject */
    function ControllerFunction(elementData) {
        var vm = this;

        vm.details = {};

        activate();

        function activate() {
            vm.details = elementData;
        }
    }

})();
