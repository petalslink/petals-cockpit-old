'use strict';

module.exports = angular.module('frontend-desktop',
    [
        require('./home').name,
        require('./pages').name
    ])
    .controller('MainCtrl', require('./MainController'));