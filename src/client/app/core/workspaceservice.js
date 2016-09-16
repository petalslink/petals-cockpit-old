(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('workspaceservice', workspaceservice);

    workspaceservice.$inject = ['dataservice', '$q'];

    /* @ngInject */
    function workspaceservice(dataservice, $q) {

        var service = {
            getWorkspaceData: getWorkspaceData,
            addWorkspaceElement: addWorkspaceElement
        };

        return service;

        function addWorkspaceElement(element) {
            // TODO reuse previously retrieved workspace config
            var config = dataservice.getPetalsComponentConfig();
            var newEl = dataservice.addElement(element);

            return $q.all([newEl, config]).then(function (ps) {
                populateTypes(ps[0], ps[1]);
                return ps[0];
            });
        }

        function getWorkspaceData() {
            var elements = dataservice.getPetalsComponents();
            var config = dataservice.getPetalsComponentConfig();

            return $q.all([elements, config]).then(function (ps) {
                populateTypes(ps[0], ps[1]);

                // we directly add a method to it to find an element by id in it
                ps[0].getComponentById = function (id) {
                    return getComponentById(ps[0], id);
                };

                return ps[0];
            });
        }

        function getComponentById(data, id) {
            return walk(data);

            function walk(componentData) {
                if (componentData) {
                    if (componentData.id === id) {
                        return componentData;
                    } else {
                        if (componentData.children) {
                            for (var i = 0; i < componentData.children.length; i++) {
                                var searchInChild = walk(componentData.children[i]);
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

        function populateTypes(data, config) {
            data.typeData = getConfigComponentType(data, config);
            data.children.forEach(function (child) {
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
