(function () {
    'use strict';

    angular
        .module('app.overview')
        .directive('tmplOverview', directiveFunction)
        .controller('OverviewController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/petals/console/overview/overview.html',
            scope: {
            },
            controller: 'OverviewController',
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
