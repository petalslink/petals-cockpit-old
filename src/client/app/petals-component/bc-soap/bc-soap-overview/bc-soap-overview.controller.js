(function () {
    'use strict';

    angular
        .module('petalsComponent.overviewBcSoap')
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
