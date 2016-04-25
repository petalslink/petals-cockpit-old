(function () {
    'use strict';

    angular
        .module('petalsComponent.bc-soap.overview')
        .controller('OverviewBcSoapController', ControllerFunction);

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
