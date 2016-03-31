(function () {
    'use strict';

    angular
        .module('app.overviewSu')
        .directive('tmplOverviewSu', directiveFunction)
        .controller('OverviewSuController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'src/client/app/petals-component/su/su-overview/su-overview.html',
            scope: {
            },
            controller: 'OverviewSuController',
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
