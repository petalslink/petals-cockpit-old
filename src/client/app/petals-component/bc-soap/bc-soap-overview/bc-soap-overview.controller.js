(function () {
    'use strict';

    angular
        .module('app.overviewBcSoap')
        .controller('OverviewBcSoapController', ControllerFunction);

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
