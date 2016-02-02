'use strict';

module.exports = angular.module('frontend-desktop',
    [
        require('./home').name
    ])
    .controller('MainCtrl', require('./MainController'));