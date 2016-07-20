(function () {
    'use strict';

    angular
        .module('petalsComponent.bc-soap.operation')
        .controller('OperationBcSoapController', ControllerFunction);

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
