(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$location', '$q', 'exception', 'logger'];

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {
        /* jshint validthis:true */
        var readyPromise;

        var service = {
            getPetalsComponent: getPetalsComponent,
            getPetalsComponents: getPetalsComponents,
            getPetalsComponentConfig: getPetalsComponentConfig,
            ready: ready
        };

        return service;

        function getPetalsComponent(id) {
            return $http.get('/api/workspace/Demo/element/' + id)
                .then(getPetalsComponentComplete,
                      getPetalsComponentFailed);

            function getPetalsComponentComplete(data) {
                return data.data.config;
            }

            function getPetalsComponentFailed(e) {
                logger.error('****** getPetalsComponentFailed' + e.data.description);
                //todo nothing !
                $location.url('/');
                return exception.catcher('XHR Failed for getPetalsComponent')(e);
            }
        }

        function getPetalsComponents() {
            return $http.get('/api/workspace/Demo/elements')
                .then(getPetalsComponentsComplete,
                      getPetalsComponentsFailed);

            function getPetalsComponentsComplete(data) {
                return data.data;
            }

            function getPetalsComponentsFailed(e) {
                logger.error('****** getPetalsComponentsFailed' + e.data.description);
                //todo nothing !
/*
                $location.url('/');
*/
/*
                return exception.catcher('XHR Failed for getPetalsComponent')(e);
*/
                exception.catcher('XHR Failed for getPetalsComponent')(e);
                return $q.reject(e);
            }
        }

        function getPetalsComponentConfig() {
            return $http.get('/api/workspace/Demo/configuration')
                .then(getPetalsComponentConfigComplete,
                      getPetalsComponentConfigFailed);

            function getPetalsComponentConfigComplete(data) {
                return data.data;
            }

            function getPetalsComponentConfigFailed(e) {
                logger.error('****** getPetalsComponentConfigFailed'+ e.data.description);
                return exception.catcher('XHR Failed for getPetalsComponent')(e);
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
                function() { return promisesArray ? $q.all(promisesArray) : readyPromise; },
                function() { exception.catcher('"ready" function failed');}
            );
        }
    }
})();
