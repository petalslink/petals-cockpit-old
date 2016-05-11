(function () {
    'use strict';

    angular
        .module('petalsComponent.server.overview')
        .controller('OverviewServerController', ControllerFunction);

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
