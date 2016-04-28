(function () {
    'use strict';

    angular
        .module('app.overviewServer')
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
