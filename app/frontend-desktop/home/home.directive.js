(function () {
    'use strict';

    angular
        .module('frontend-desktop.home', [])
        .directive('homeDirective');

    function homeDirective() {
        return {
            controller: 'HomeController', // Called from HomeController.js
            controllerAs: 'ctrl',
            bindToController: true,
            restrict: 'EA',
            scope: true,
            template: require('./home.html')
        };
    }

})();