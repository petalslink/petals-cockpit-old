(function () {
    'use strict';

    angular
        .module('app.configServer')
        .directive('tmplConfigServer', directiveFunction)
        .controller('ConfigServerController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'src/client/app/petals-component/server/server-config/server-config.html',
            scope: {
            },
            controller: 'ConfigServerController',
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
