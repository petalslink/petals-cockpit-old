// Karma configuration

'use strict';

var istanbul = require('browserify-istanbul');

module.exports = function (config) {

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['browserify', 'mocha', 'chai', 'sinon'],

        // list of files / patterns to load in the browser
        files: [
            './libs/angular/angular.js',
            './libs/angular-mocks/angular-mocks.js', // for angular.mock.module and inject.
            './app/**/*.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './app/**/!(*spec)*.js': ['browserify']
        },

        // karma-browserify configuration

        browserify: {
            debug: true,
            transform: ['debowerify', 'partialify', istanbul({
                'ignore': ['**/*.spec.js', '**/libs/**']
            })],

            // don't forget to register the extensions
            extensions: ['.js']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'spec'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: './reports/coverage'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            // 'Chrome',
            'PhantomJS'
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false

    });
};
