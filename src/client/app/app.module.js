(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',
        'app.layout',

        // Features Workspace
        'app.workspace'
    ]);

})();
