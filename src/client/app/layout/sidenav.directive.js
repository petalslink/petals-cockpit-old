(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('tmplSidenav', directiveFunction)
        .controller('SidenavController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/layout/sidenav.html',
            controller: 'SidenavController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$mdSidenav', '$scope'];

    /* @ngInject */
    function ControllerFunction($mdSidenav, $scope) {

        $scope.toggleSidenav = toggleSidenav;

        function toggleSidenav() {
            $mdSidenav('left').toggle();
        }
        // SIDENAV

        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.lockLeft = true;
        $scope.isOpenRight = function () {
            return $mdSidenav('right').isOpen();
        };
        $scope.isOpenLeft = function () {
            return $mdSidenav('left').isOpen();
        };
        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };

        function buildToggler(navID) {
            return function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }
    }

})();
