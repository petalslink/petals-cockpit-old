'use strict';

module.exports = function petalsDirective() {

    return {
        controller: 'PetalsCtrl',
        controllerAs: 'ctrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./petals.html')
    };
};