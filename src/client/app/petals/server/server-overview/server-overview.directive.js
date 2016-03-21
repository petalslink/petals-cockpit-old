(function () {
    'use strict';

    angular
        .module('app.overviewServer')
        .directive('tmplOverviewServer', directiveFunction)
        .controller('OverviewServerController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/petals/server/server-overview/server-overview.html',
            scope: {
            },
            controller: 'OverviewServerController',
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
