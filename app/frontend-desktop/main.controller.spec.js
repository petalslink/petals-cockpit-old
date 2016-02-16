(function () {
    'use strict';

    angular
        .module('frontend-desktop', [])
        .describe('MainController');

    function MainController() {

        var ctrl, scope;

        beforeEach(angular.mock.module('myApp'));

        beforeEach(function () {

            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                ctrl = $controller('MainCtrl', {
                    $scope: scope
                });
            });

        });

        it('should exist', function () {
            expect(ctrl).to.not.be.undefined;
            expect(scope.test).to.be.null;
        });

    }

})();