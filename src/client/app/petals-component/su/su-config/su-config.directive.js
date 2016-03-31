(function () {
    'use strict';

    angular
        .module('app.configSu')
        .directive('tmplConfigSu', directiveFunction)
        .controller('ConfigSuController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'src/client/app/petals-component/su/su-config/su-config.html',
            scope: {
            },
            controller: 'ConfigSuController',
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
