/*jshint expr: true*/

'use strict';

describe('PagesController', function() {

    var ctrl, scope;

    beforeEach(angular.mock.module('myApp'));

    beforeEach(function() {

        angular.mock.inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('PagesCtrl', {
                $scope: scope
            });
        });

    });

    it('should exist', function() {
        expect(ctrl).to.not.be.undefined;
    });

});