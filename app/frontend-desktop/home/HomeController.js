'use strict';
// Controller naming conventions should start with an uppercase letter
function HomeCtrl($scope) {
    $scope.infoInclude = 'This is the content from home.html';

    console.log('Home Info !');

}

// $inject is necessary for minification. See http://bit.ly/1lNICde for explanation.
HomeCtrl.$inject = ['$scope'];
module.exports = HomeCtrl;