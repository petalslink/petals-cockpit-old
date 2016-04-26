(function() {
    'use strict';

    angular.module('app.petals', [
        'petalsComponent.fallback-component',
        'petalsComponent.bus',
        'app.server',
        'petalsComponent.bc-soap'
    ]);
})();
