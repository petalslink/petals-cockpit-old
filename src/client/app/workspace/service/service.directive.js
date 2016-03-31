(function () {
    'use strict';

    angular
        .module('app.service')
        .directive('tmplService', directiveFunction)
        .controller('ServiceController', ControllerFunction);

    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/service/service.html',
            controller: 'ServiceController',
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
