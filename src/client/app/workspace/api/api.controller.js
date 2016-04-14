(function () {
    'use strict';

    angular
        .module('app.api')
        .controller('ApiController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['dataWkspceService'];

    /* @ngInject */
    function ControllerFunction(dataWkspceService) {
        dataWkspceService.setInfoSelect('API');

    }

})();
