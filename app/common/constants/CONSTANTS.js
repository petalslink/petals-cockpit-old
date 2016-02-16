(function () {
    'use strict';

    angular
        .module('app', [])
        .constant('appConstants');

    function appConstants() {
        return {
            successMessage: 'You have successfully logged in.',
            failureMessage: 'Your username or password is incorrect.',
            key: 'value'
        };
    }

})();

appConstants.$inject = [];