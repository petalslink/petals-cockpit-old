(function () {

    'use strict';

    angular.module('app.workspace')
        .directive('tmplWorkspace', directiveFunction)
        .controller('WorkspaceController', ControllerFunction);

    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'src/client/app/layout/workspace/workspace.html',
            scope: {
            },
            controller: 'WorkspaceController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope'];

    /* @ngInject */
    function ControllerFunction($scope) {

        // TABS VIEWS TREE
        $scope.dataNav = {

            petalsLocked: false,
            petalsLabel: 'Petals',
            petalsIcon: 'lock_open',

            serviceLocked: false,
            serviceLabel: 'Service',
            serviceIcon: 'lock',

            apiLocked: false,
            apiLabel: 'Api',
            apiIcon: 'lock'
        };
    }

})();
