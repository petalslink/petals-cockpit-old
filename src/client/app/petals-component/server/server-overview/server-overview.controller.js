(function () {
    'use strict';

    angular
        .module('app.overviewServer')
        .controller('OverviewServerController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope', 'promiseDetails'];

    /* @ngInject */
    function ControllerFunction($scope, promiseDetails) {
        $scope.details = {};

        activate();

        function activate() {
            $scope.details = promiseDetails;
        }

    }

})();
