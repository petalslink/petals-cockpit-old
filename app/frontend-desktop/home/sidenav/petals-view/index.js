'use strict';
// Petals View
module.exports = angular.module('frontend-desktop.home.sidenav.petals-view', [])
    .directive('petalsView', require('./petalsDirective'))
    .controller('PetalsCtrl', require('./PetalsController'));
/*    .config('petalsConfig', require('./petalsConfig'));*/
