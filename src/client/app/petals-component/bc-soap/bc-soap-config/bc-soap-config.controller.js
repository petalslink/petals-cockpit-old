(function () {
    'use strict';

    angular
        .module('petalsComponent.configBcSoap')
        .controller('ConfigBcSoapController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['promiseDetails'];

    /* @ngInject */
    function ControllerFunction(promiseDetails) {
        var vm = this;
        vm.details = {};

        activate();

        function activate() {
            vm.details = promiseDetails;
        }

    }

})();
