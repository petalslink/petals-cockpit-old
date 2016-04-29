(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('configTile', directiveFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'src/client/app/layout/config-tile.html',
            scope: {
                tile: '=tile'
            }
        };

        return directive;
    }

})();
