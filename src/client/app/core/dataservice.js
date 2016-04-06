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
            return $http.get('http://localhost:7203/api/petalscomponent/demo/' + id)
                .then(getPetalsComponentComplete)
                .catch(getPetalsComponentFailed);

            function getPetalsComponentComplete(data, status, headers, config) {
                console.log(angular.toJson(data));
                return data.data;
            }

            function getPetalsComponentFailed(e) {
                console.log("****** getPetalsComponentFailed");
                console.log("****** "+ e.data.description);

                $location.url('/');
                return exception.catcher('XHR Failed for getPetalsComponent')(e);
            }
        }

        function getPetalsComponents() {
//           return $http.get('/api/petalscomponents/demo')
            return $http.get('http://localhost:7203/api/petalscomponents/demo')
                .then(getPetalsComponentsComplete)
                .catch(getPetalsComponentsFailed);

            function getPetalsComponentsComplete(data, status, headers, config) {
                console.log("****** getPetalsComponentsComplete");
                console.log(angular.toJson(data));
                return data.data;
            }

            function getPetalsComponentsFailed(e) {
                console.log("****** getPetalsComponentsFailed");
                console.log("****** "+ e.data.description);
                $location.url('/');
                return exception.catcher('XHR Failed for getPetalsComponent')(e);
            }
        }

        function getPetalsComponentConfig() {
//           return $http.get('/api/petalscomponents/demo')
            return $http.get('http://localhost:7203/api/petalscomponentsconfig')
                .then(getPetalsComponentConfigComplete)
                .catch(getPetalsComponentConfigFailed);

            function getPetalsComponentConfigComplete(data, status, headers, config) {
                console.log("****** getPetalsComponentConfigComplete");
                console.log(angular.toJson(data));
                return data.data;
            }

            function getPetalsComponentConfigFailed(e) {
                console.log("****** getPetalsComponentConfigFailed");
                console.log("****** "+ e.data.description);
                $location.url('/');
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
            return getReady()
                .then(function() {
                    return promisesArray ? $q.all(promisesArray) : readyPromise;
                })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();
