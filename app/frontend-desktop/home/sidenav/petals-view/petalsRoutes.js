'use strict';

function petalsRoutes($stateProvider) {

    $stateProvider
        .state('petals-view', {
            name: 'petals-view',
            url: '/petals-view',
            abstract: true,
            controller: 'PetalsCtrl'
        })
}

petalsRoutes.$inject = ['$stateProvider'];
module.exports = petalsRoutes;