(function () {
    'use strict';

    angular
        .module('app.apptabs')
        .directive('tmplApptabs', directiveFunction)
        .controller('ApptabsController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/apptabs/apptabs.html',
            scope: {
            },
            controller: 'ApptabsController',
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

            selectedIndex: 0,

            view1Locked: false,
            view1Label: 'Petals',
            view1Icon: 'lock_open',

            view2Locked: false,
            view2Label: 'Service',
            view2Icon: 'lock',

            view3Locked: false,
            view3Label: 'Api',
            view3Icon: 'lock',


            /* Position Toolbar Tab on Top when it's false */
            bottom: false
        };
    }

})();
