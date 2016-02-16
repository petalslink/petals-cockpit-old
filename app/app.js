'use strict';

//var angular = require('angular');

//angular.module('app', []);
//    .constant('version', require('../package.json').version);

var angular = require('angular');

module.exports = angular.module('myApp',
    [
        require('./common/common.js').name,
        require('./frontend-desktop').name
    ])
    .config(require('./app-config'))
    .constant('version', require('../package.json').version)
    .run(require('./common/common-init.js'));