(function () {
    'use strict';

    angular
        .module('app.menu')
        .directive('tmplMenu', directiveFunction)
        .controller('MenuController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/menu/menu.html',
            scope: {
            },
            controller: 'MenuController',
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
