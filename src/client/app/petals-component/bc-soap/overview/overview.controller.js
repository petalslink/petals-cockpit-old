(function () {
    'use strict';

    angular
        .module('petalsComponent.bc-soap.overview')
        .controller('OverviewBcSoapController', ControllerFunction);

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
