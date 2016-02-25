(function () {
    'use strict';

    angular
        .module('app.config')
        .directive('tmplConfig', directiveFunction)
        .controller('ConfigController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/petals/console/config/config.html',
            scope: {
            },
            controller: 'ConfigController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope'];

    /* @ngInject */
    function ControllerFunction($scope) {

    }

})();
