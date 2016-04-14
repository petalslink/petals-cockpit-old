(function () {
    'use strict';

    angular
        .module('app.service')
        .controller('ServiceController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['dataWkspceService'];

    /* @ngInject */
    function ControllerFunction(dataWkspceService) {
        dataWkspceService.setInfoSelect('SERVICE');

    }

})();
