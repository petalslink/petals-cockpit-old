(function () {

    'use strict';

    angular.module('app.fallbackComponent')
        .controller('fallbackComponentController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = [];

    /* @ngInject */
    function ControllerFunction() {

        activate();

        function activate() {
        }
    }

})();
