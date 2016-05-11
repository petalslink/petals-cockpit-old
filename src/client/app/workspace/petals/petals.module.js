(function() {
    'use strict';

    angular.module('app.petals', [
        'petalsComponent.fallback-component',
        'petalsComponent.bus',
        'petalsComponent.server',
        'petalsComponent.bc-soap'
    ]);
})();
