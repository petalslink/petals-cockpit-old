(function() {
    'use strict';

    angular.module('app.core', [
        'ngAnimate',
        'ngMaterial',
        'ngSanitize',
        'ngMessages',

        // Our reusable blocks
        'blocks.exception',
        'blocks.logger',

        // 3rd Party modules
        'ui.router',
        'ct.ui.router.extras'
    ]);
})();
