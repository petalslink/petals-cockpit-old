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


'use strict';

angular.module('common',
    [
        'ui.router',
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMaterial',
        'ngResource',
        'ngSanitize',
        'restangular'
    ]);