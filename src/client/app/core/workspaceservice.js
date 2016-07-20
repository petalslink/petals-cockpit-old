(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('workspaceservice', workspaceservice);

    workspaceservice.$inject = ['dataservice', '$q'];

    /* @ngInject */
    function workspaceservice(dataservice, $q) {

        var service = {
            getWorkspaceData: getWorkspaceData
        };
        
        return service;
        
        function getWorkspaceData() {
            var elements = dataservice.getPetalsComponents();
            var config = dataservice.getPetalsComponentConfig();

            return $q.all([elements, config]).then(function(ps) {
                populateTypes(ps[0], ps[1]);

                return ps[0];
            });
        }

        function populateTypes(data, config) {
            data.typeData = getConfigComponentType(data, config);
            data.children.forEach(function(child) {
                populateTypes(child, config);
            });
        }

        function getConfigComponentType(component, conf) {
            return walk(conf);

            function walk(config) {
                if (config) {
                    if (config.name === component.type) {
                        return config;
                    } else {
                        if (config.contains) {
                            for (var i = 0; i < config.contains.length; i++) {
                                var searchInChild = walk(config.contains[i]);
                                if (searchInChild) {
                                    return searchInChild;
                                }
                            }
                        }
                    }
                }
                return null;
            }
        }
    }
})();
