(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('tmplAppbar', directiveFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'src/client/app/layout/appbar.html',
            controller: 'AuthController',
            controllerAs: 'vm'
        };

        return directive;
    }

})();
