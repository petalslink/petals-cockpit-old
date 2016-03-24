(function () {
    'use strict';

    angular
        .module('app.api')
        .directive('tmplApi', directiveFunction)
        .controller('ApiController', ControllerFunction);

    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/api/api.html',
            controller: 'ApiController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = [];

    /* @ngInject */
    function ControllerFunction() {

    }

})();
