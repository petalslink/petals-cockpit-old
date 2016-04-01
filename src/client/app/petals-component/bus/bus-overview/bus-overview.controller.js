(function () {
    'use strict';

    angular
        .module('app.overviewBus')
        .controller('OverviewBusController', ControllerFunction);

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
