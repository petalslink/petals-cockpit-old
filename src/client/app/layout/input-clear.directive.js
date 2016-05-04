/*
(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('inputClear', inputClear);

    // ----- directiveFunction -----
    inputClear.$inject = [];

    /!* @ngInject *!/
    function inputClear() {
        return {
            restrict: 'A',
            compile: function (element, attrs) {
                var color = attrs.inputClear;
                var style = color ? 'color:' + color + ';' : '';
                var action = attrs.ngModel + ' = ';
                element.after(
                    '<md-button class="animate-show md-icon-button md-accent"' +
                    'ng-show="' + attrs.ngModel + '" ng-click="' + action + '"' +
                    'style="position: absolute; top: 0px; right: -6px; margin: 13px 0px;">' +
                    '<div style="' + style + '">x</div>' +
                    '</md-button>');
            }
        };
    }


})();*/
