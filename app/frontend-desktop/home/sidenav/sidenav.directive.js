(function () {
    'use strict';

    angular
        .module('frontend-desktop.home.sidenav', [])
        .directive('sidenavDirective')
        .directive('myTree');

    function sidenavDirective() {

        return {
            controller: 'SidenavController',
            controllerAs: 'ctrl',
            bindToController: true,
            restrict: 'EA',
            scope: true,
            template: require('./sidenav.html')
        };
    }


    function myTree() {

        return {
            controller: 'SidenavController',
            controllerAs: 'ctrl',
            bindToController: true,
            restrict: 'EA',
            scope: true,
            template: require('./sidenav.html')
        };
    }

})();