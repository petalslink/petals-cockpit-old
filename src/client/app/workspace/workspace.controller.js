(function () {

    'use strict';

    angular.module('app.workspace')
        .controller('WorkspaceController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope'];

    /* @ngInject */
    function ControllerFunction($scope) {

        activate();

        $scope.dataNavMenu = {
            menuLocked: false,
            menuLabel: 'Menu',
            menuIcon: 'menu'
        };

        $scope.dataNav = [
            {
                Locked: false,
                Label: 'Petals',
                UiSref: '.petals'
            },
            {
                Locked: false,
                Label: 'Service',
                UiSref: '.service'

            },
            {
                Locked: false,
                Label: 'Api',
                UiSref: '.api'

            }
        ];

        function activate() {
            $scope.$state.go('workspace.petals');
        }
    }

})();
