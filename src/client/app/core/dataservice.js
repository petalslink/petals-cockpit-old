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
            // todo remove url when proxy of API is OK
            // return $http.get('/api/petalscomponent/demo/' + id)
            return $http.get('http://localhost:7203/api/petalscomponent/demo/' + id)
/*
            return $http.get('http://10.31.0.121:7203/api/petalscomponent/demo/' + id)
*/
                .then(getPetalsComponentComplete,
                      getPetalsComponentFailed);

            function getPetalsComponentComplete(data) {
                return data.data;
            }

            function getPetalsComponentFailed(e) {
                logger.info('****** getPetalsComponentFailed');
                logger.info('****** '+ e.data.description);
                //todo nothing !
/*
                $location.url('/');
*/
                return exception.catcher('XHR Failed for getPetalsComponent')(e);
            }
        }

        function getPetalsComponents() {
            // todo remove url when proxy of API is OK
            // return $http.get('/api/petalscomponents/demo')
            return $http.get('http://localhost:7203/api/petalscomponents/demo')
/*
            return $http.get('http://10.31.0.121:7203/api/petalscomponents/demo')
*/
                .then(getPetalsComponentsComplete,
                      getPetalsComponentsFailed);

            function getPetalsComponentsComplete(data) {
                return data.data;
            }

            function getPetalsComponentsFailed(e) {
                logger.info('****** getPetalsComponentsFailed');
                logger.info('****** '+ e.data.description);
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
            // todo remove url when proxy of API is OK
            // return $http.get('/api/petalscomponentsconfig/demo')
            return $http.get('http://localhost:7203/api/petalscomponentsconfig/demo')
/*
            return $http.get('http://10.31.0.121:7203/api/petalscomponentsconfig/demo')
*/
                .then(getPetalsComponentConfigComplete,
                      getPetalsComponentConfigFailed);

            function getPetalsComponentConfigComplete(data) {
                return data.data;
            }

            function getPetalsComponentConfigFailed(e) {
                logger.info('****** getPetalsComponentConfigFailed');
                logger.info('****** '+ e.data.description);
                //todo nothing ! let ui-router$on mange
/*
                $location.url('/');
*/
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
