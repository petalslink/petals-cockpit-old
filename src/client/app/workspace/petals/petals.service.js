(function () {
    'use strict';

    angular
        .module('app.petals')
        .factory('petalsService', petalsService);

    petalsService.$inject = ['logger'];

    /* @ngInject */
    function petalsService(logger) {

        var service = {
            setSelectedComponentId: setSelectedComponentId,
            getSelectedComponentId: getSelectedComponentId,
            test: test
        };

        var selectedComponentId = -1;

        return service;

        function setSelectedComponentId(id) {
            selectedComponentId = id;
            logger.debug('--- petals.service.js   setSelectedComponentId() : '+ selectedComponentId);
        }

        function getSelectedComponentId() {
            logger.debug('--- petals.service.js   getSelectedComponentId() : '+ selectedComponentId);
            return selectedComponentId;
        }

        function test() {
            logger.debug('--- petals.service.js   test()');
        }

    }
})();
