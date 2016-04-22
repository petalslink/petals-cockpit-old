(function() {
    'use strict';

    angular.module('app.petals', [
        'app.fallback-component',
        'app.bus',
        'app.server',
        'app.bc-soap',
        'app.su-provide'
    ]);
})();
