(function () {
    'use strict';

    angular
        .module('app')
        .describe('HomeController',

            function HomeController() {

                var ctrl, scope;

                beforeEach(angular.mock.module('app'));

                beforeEach(function () {

                    angular.mock.inject(function ($controller, $rootScope) {
                        scope = $rootScope.$new();
                        ctrl = $controller('HomeController', {
                            $scope: scope
                        });
                    });

                });

                it('should exist', function () {
                    expect(ctrl).to.not.be.undefined;
                });

            })

})();
