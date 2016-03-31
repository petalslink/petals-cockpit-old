(function () {
    'use strict';

    angular
        .module('app.nav-consoleSu')
        .directive('tmplNavConsoleSu', directiveFunction)
        .controller('NavConsoleSuController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'src/client/app/petals-component/su/su-nav-console/su-nav-console.html',
            scope: {
            },
            controller: 'NavConsoleSuController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope', '$state'];

    /* @ngInject */
    function ControllerFunction($scope) {

    }

})();
