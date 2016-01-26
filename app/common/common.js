window.jQuery = window.$ = require('jquery');
window._ = require('lodash');

require('angular-ui-router');
require('angular-animate');
require('angular-aria');
require('angular-cookies');
require('angular-material');
require('angular-resource');
require('angular-sanitize');
require('domready/ready');
require('lodash');
require('restangular');

module.exports = angular.module('common',
    [
        'ui.router',
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMaterial',
        'ngResource',
        'ngSanitize',
        'restangular',
        require('./elements/header').name,
        require('./elements/footer').name,
        require('./constants').name,
        require('./directives').name,
        require('./resources').name,
        require('./services').name
    ]);
