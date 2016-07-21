/* jshint node: true, -W024, -W040, -W098, -W126 */

'use strict';

var $ = require('gulp-load-plugins')({lazy: true});
var src = './src/client/';

module.exports = {

    // --- Configurables ---
    defaultPort: '7203',
    sourceDir: src,
    testDir: './test/',
    buildDir: './build/',
    tempDir: './.tmp/',
    dbDir: './db/',
    js: [
        // MODULE -- inject first --
        src + 'app/**/*.module.js',
        // CORE
        src + 'app/core/*.js',
        // BLOCKS
        src + 'app/blocks/**/*.js',
        // LAYOUT
        src + 'app/layout/*.js',
        // WORKSPACE
        src + 'app/workspace/*.js',
        src + 'app/workspace/api/*.js',
        src + 'app/workspace/petals/*.js',
        src + 'app/workspace/service/*.js',
        // PETALS-COMPONENT
        // --- FallBack Component
        src + 'app/petals-component/fallback-component/*.js',
        // --- Bus Component
        src + 'app/petals-component/bus/*.js',
        src + 'app/petals-component/bus/**/*.js',
        // --- Server Component
        src + 'app/petals-component/server/*.js',
        src + 'app/petals-component/server/**/*.js',
        // --- Bc-Soap Component
        src + 'app/petals-component/bc-soap/*.js',
        src + 'app/petals-component/bc-soap/**/*.js',
        src + 'app/petals-component/bc-soap/**/**/*.js'
    ],
    html: [
        // INDEX
        src + '*.html',
        // CORE
        src + 'app/core/*html',
        // LAYOUT
        src + 'app/layout/*html',
        // WORKSPACE
        src + 'app/workspace/*html',
        src + 'app/workspace/api/*.html',
        src + 'app/workspace/petals/*.html',
        src + 'app/workspace/petals/modals/*.html',
        src + 'app/workspace/service/*.html',
        // PETALS-COMPONENT
        // --- FallBack Component
        src + 'app/petals-component/fallback-component/*.html',
        // --- Bus Component
        src + 'app/petals-component/bus/*.html',
        src + 'app/petals-component/bus/**/*.html',
        // --- Server Component
        src + 'app/petals-component/server/*.html',
        src + 'app/petals-component/server/**/*.html',
        // --- Bc-Soap Component
        src + 'app/petals-component/bc-soap/*.html',
        src + 'app/petals-component/bc-soap/**/*.html',
        src + 'app/petals-component/bc-soap/**/**/*.html'
    ],
    sass: [
        // APP
        src + 'app/*.scss',
        // LAYOUT
        src + 'app/layout/*.scss',
        // WORKSPACE
        src + 'app/workspace/*.scss',
        src + 'app/workspace/api/*.scss',
        src + 'app/workspace/petals/*.scss',
        src + 'app/workspace/service/*.scss',
        // PETALS-COMPONENT
        // --- FallBack Component
        src + 'app/petals-component/fallback-component/*.scss',
        // --- Bus Component
        src + 'app/petals-component/bus/*.scss',
        src + 'app/petals-component/bus/**/*.scss',
        // --- Server Component
        src + 'app/petals-component/server/*.scss',
        src + 'app/petals-component/server/**/*.scss',
        // --- Bc-Soap Component
        src + 'app/petals-component/bc-soap/*.scss',
        src + 'app/petals-component/bc-soap/**/*.scss',
        src + 'app/petals-component/bc-soap/**/**/*.scss'
    ],

    $: $,
    args: require('yargs').argv,

    // --- Utilities ---
    log: function(msg) {
        if (typeof(msg) === 'object') {
            for (var item in msg) {
                if (msg.hasOwnProperty(item)) {
                    $.util.log($.util.colors.blue(msg[item]));
                }
            }
        } else {
            $.util.log($.util.colors.blue(msg));
        }
    },
    err: function(msg) {
        if (typeof(msg) === 'object') {
            for (var item in msg) {
                if (msg.hasOwnProperty(item)) {
                    $.util.log($.util.colors.red(msg[item]));
                }
            }
        } else {
            $.util.log($.util.colors.red(msg));
        }
    }

};
