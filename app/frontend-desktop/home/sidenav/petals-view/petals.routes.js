(function () {
    'use strict';

    angular
        .module('frontend-desktop.home.sidenav.petals-view', [])
        .config('petalsRoutes', petalsRoutes);

    petalsRoutes.$inject = ['$stateProvider'];

    function petalsRoutes($stateProvider) {

        $stateProvider
            .state('petals-view', {
                name: 'petals-view',
                url: '/petals-view',
                abstract: true,
                controller: 'PetalsController'
            })
    }

})();