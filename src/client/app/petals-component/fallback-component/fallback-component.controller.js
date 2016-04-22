(function () {

    'use strict';

    angular.module('app.fallback-component')
        .controller('FallbackComponentController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = [];

    /* @ngInject */
    function ControllerFunction() {

        activate();

        function activate() {
        }
    }

})();
