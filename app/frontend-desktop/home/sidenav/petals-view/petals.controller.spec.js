(function () {
    'use strict';

    angular
        .module('frontend-desktop.home.sidenav.petals-view', [])
        .describe('PetalsController');

    function PetalsController() {

        var ctrl, scope;

        beforeEach(angular.mock.module('app'));

        beforeEach(function () {

            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                ctrl = $controller('PetalsController', {
                    $scope: scope
                });
            });

        });

        it('should exist', function () {
            expect(ctrl).to.not.be.undefined;
        });

    }

})();