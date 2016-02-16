(function () {
    'use strict';

    angular
        .module('frontend-desktop.home', [])
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];

// Controller naming conventions should start with an uppercase letter
    function HomeController($scope) {

        $scope.infoInclude = 'This is the content from home.html';
        console.log('Home Info !');
    }

})();