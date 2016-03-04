(function () {

    'use strict';

    angular.module('app.workspace')
        .directive('tmplWorkspace', directiveFunction);


    // ----- directiveFunction -----
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/workspace/workspace.html',
            scope: {
            }
        };

        return directive;
    }

})();
