(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];

    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        /* jshint validthis:true */
        var readyPromise;

        var service = {
            getPetalsComponent: getPetalsComponent,
            getPetalsComponents: getPetalsComponents,
            getPetalsComponentConfig: getPetalsComponentConfig,
            addElement: addElement,
            updateElement: updateElement,
            deleteElement: deleteElement,
            ready: ready
        };

        return service;

        function getPetalsComponent(id) {
            return $http.get('/api/workspaces/Demo/elements/' + id)
                .then(getPetalsComponentComplete, getPetalsComponentFailed);

            function getPetalsComponentComplete(data) {
                return data.data.config;
            }

            function getPetalsComponentFailed(e) {
                logger.error('****** getPetalsComponentFailed' + e.data.description);
                exception.catcher('XHR Failed for getPetalsComponent')(e);
                return $q.reject(e);
            }
        }

        // Add data element with POST
        function addElement(element) {
            return $http.post('/api/workspaces/Demo/elements', element)
                .then(addElementComplete, addElementFailed);

            function addElementComplete(data) {
                logger.success('New Component is added !');
                return data.data;
            }
            function addElementFailed(e) {
                logger.error('****** addElementFailed' + e.data.description);
                exception.catcher('Failed to add new Element')(e);
                return $q.reject(e);
            }
        }

        // Update data element with PUT
        function updateElement(element) {
            return $http.put('/api/workspaces/Demo/elements/' + element.id, element)
                .then(updateElementComplete, updateElementFailed);

            function updateElementComplete(data) {
                return data.data;
            }

            function updateElementFailed(e) {
                logger.error('****** updateElementFailed' + e.data.description);
                exception.catcher('Failed to updateElement')(e);
                return $q.reject(e);
            }
        }

        // Delete data element with DELETE
        function deleteElement(element) {
            return $http.delete('/api/workspaces/Demo/elements/' + element.id)
                .then(deleteElementComplete, deleteElementFailed);

            function deleteElementComplete(data) {
                logger.success('Component is deleted !');
                return data.data;
            }

            function deleteElementFailed(e) {
                logger.error('****** deleteElementFailed' + e.data.description);
                exception.catcher('Failed to deleteElement')(e);
                return $q.reject(e);
            }
        }

        function getPetalsComponents() {
                return $http.get('/api/workspaces/Demo/elements')
                    .then(getPetalsComponentsComplete, getPetalsComponentsFailed);

            function getPetalsComponentsComplete(data) {
                return data.data;
            }

            function getPetalsComponentsFailed(e) {
                logger.error('****** getPetalsComponentsFailed' + e.data.description);
                exception.catcher('XHR Failed for getPetalsComponent')(e);
                return $q.reject(e);
            }
        }

        function getPetalsComponentConfig() {
                return $http.get('/api/workspaces/Demo/configuration')
                    .then(getPetalsComponentConfigComplete, getPetalsComponentConfigFailed);

            function getPetalsComponentConfigComplete(data) {
                return data.data;
            }

            function getPetalsComponentConfigFailed(e) {
                logger.error('****** getPetalsComponentConfigFailed' + e.data.description);
                exception.catcher('XHR Failed for getPetalsComponent')(e);
                return $q.reject(e);
            }
        }

        function getReady() {
            if (!readyPromise) {
                // Apps often pre-fetch session data ("prime the app")
                // before showing the first view.
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                logger.info('Primed the app data');
                readyPromise = $q.when(service);
            }
            return readyPromise;
        }

        function ready(promisesArray) {
            return getReady().then(
                function () {
                    return promisesArray ? $q.all(promisesArray) : readyPromise;
                },
                function () {
                    exception.catcher('"ready" function failed');
                }
            );
        }
    }
})();
