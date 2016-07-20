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
            getSelectedComponentId: getSelectedComponentId
        };

        var selectedComponentId = '';

        return service;

        function setSelectedComponentId(id) {
            selectedComponentId = id;
            logger.debug('--- petals.service.js   setSelectedComponentId() : '+ selectedComponentId);
        }

        function getSelectedComponentId() {
            logger.debug('--- petals.service.js   getSelectedComponentId() : '+ selectedComponentId);
            return selectedComponentId;
        }

    }
})();
