(function() {
    'use strict';

    angular.module('app.core', [
        'ngAnimate',
        'ngMaterial',
        'ngSanitize',

        // Our reusable framework
        'blocks.diagnostics',
        'blocks.exception',
        'blocks.logger',
        'blocks.router',

        // 3rd Party modules
        'ui.router',
        'ct.ui.router.extras'
    ]);
})();
