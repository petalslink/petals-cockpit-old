'use strict';
// Controller naming conventions should start with an uppercase letter
function MainCtrl($rootScope, $scope) {

    $scope.test = null;

    console.log('Up and running!');

}

// $inject is necessary for minification.
MainCtrl.$inject = ['$rootScope', '$scope'];
module.exports = MainCtrl;