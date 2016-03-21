(function () {

    'use strict';

    angular.module('app.workspace')
        .directive('tmplWorkspace', directiveFunction);

    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/workspace/workspace.html'
        };

        return directive;
    }

})();
