(function() {
    'use strict';

    angular.module('petalsComponent.server', [
        'petalsComponent.server.overview',
        'petalsComponent.server.operation',
        'petalsComponent.server.monitor',
        'petalsComponent.server.config',
        'petalsComponent.server.log',
        'petalsComponent.server.flow',
        'petalsComponent.server.user'
    ]);
})();
