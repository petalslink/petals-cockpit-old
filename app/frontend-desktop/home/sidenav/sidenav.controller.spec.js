(function () {
    'use strict';

    angular
        .module('frontend-desktop.home.sidenav', [])
        .describe('SidenavController');

    function SidenavController() {

        var ctrl, scope;

        beforeEach(angular.mock.module('app'));

        beforeEach(function () {

            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                ctrl = $controller('SidenavController', {
                    $scope: scope
                });
            });

        });

        it('should exist', function () {
            expect(ctrl).to.not.be.undefined;
        });

    }

})();