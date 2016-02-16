(function () {
    'use strict';

    angular.module('common.elements.commonHeader', [])
        .directive('commonHeader');

    function commonHeader() {
        return {
            template: require('./common-header.html'),
            restrict: 'EA',
            replace: true
        };
    }

})();