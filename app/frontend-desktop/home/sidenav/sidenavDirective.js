'use strict';

module.exports = function sidenavDirective() {

    return {
        controller: 'SidenavCtrl',
        controllerAs: 'ctrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./sidenav.html')
    };
};


module.exports = function yaTree() {

    return {
        controller: 'SidenavCtrl',
        controllerAs: 'ctrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./sidenav.html')
    };
};