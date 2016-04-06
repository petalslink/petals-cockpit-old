(function () {

    'use strict';

    angular.module('app.bc-soap')
        .controller('BcSoapController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope'];

    /* @ngInject */
    function ControllerFunction($scope) {

        activate();

        // TABS VIEWS CONSOLE
        $scope.dataNavConsole = [
            {
                Locked: false,
                Label: 'Overview',
                Icon: 'remove_red_eye',
                UiSref: '.overview'
            },
            {
                Locked: false,
                Label: 'Operation',
                Icon: 'details',
                UiSref: '.operation'
            },
            {
                Locked: false,
                Label: 'Config',
                Icon: 'settings',
                UiSref: '.config'

            }
        ];

        function activate() {
            //$scope.$state.go('.overview');
        }
    }

})();
