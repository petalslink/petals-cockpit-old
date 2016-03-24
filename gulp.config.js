/* jshint node: true, -W024, -W040, -W098, -W126 */

'use strict';

var $ = require('gulp-load-plugins')({lazy: true}),
    src = './src/client/';

module.exports = {

    // --- Configurables ---
    sourceDir: src,
    testDir: './test/',
    buildDir: './build/',
    tempDir: './.tmp/',
    js: [
        // module files in desired order
        src + 'app/**/*.module.js',

        // remaining files in desired order
        src + 'app/core/**/*.js',
        src + 'app/framework/**/*.js',
        src + 'app/petals/**/*.js',
        src + 'app/service/**/*.js',
        src + 'app/api/**/*.js',
        src + 'app/layout/**/*.js',
        src + 'app/layout/sidenav/*js',
        src + 'app/workspace/*js',
        src + 'app/layout/appbar/*js',
        src + 'app/layout/login/*.js',
        src + 'app/**/*.js',
        src + 'app/petals/bus/bus-nav-console/*.js',
        src + 'app/petals/server/server-nav-console/*.js',
        src + 'app/layout/console/*.js',
        src + 'app/petals/bus/config/**/*.js',
        src + 'app/petals/bus/**/**/*.js',
        src + 'app/petals/server/config/**/*.js',
        src + 'app/petals/server/**/**/*.js'
    ],
    html: [
        src + '*.html',
        src + 'app/**/*html',
        src + 'app/**/**/*html',
        src + 'app/layout/sidenav/*html',
        src + 'app/workspace/*html',
        src + 'app/layout/appbar/*html',
        src + 'app/layout/login/*.html',
        src + 'app/layout/console/*.html',
        src + 'app/petals/*.html',
        src + 'app/service/*.html',
        src + 'app/api/*.html',
        src + 'app/petals/bus/**/*.html',
        src + 'app/petals/server/**/*.html',
        src + 'app/petals/bus/bus-nav-console/*.html',
        src + 'app/petals/server/server-nav-console/*.html',
        src + 'app/petals/console/*.html',
        src + 'app/petals/console/**/*.html',
        src + 'app/petals/modals/*.html'
    ],
    sass: [
        src + 'app/**/*.scss',
        src + 'app/**/**/*.scss',
        src + 'app/core/**/*.scss',
        src + 'app/petals/console/*.scss',
        src + 'app/petals/console/**/*.scss',
        src + 'app/petals/server/config/**/*.scss',
        src + 'app/petals/server/**/**/*.scss',
        src + 'app/petals/**/*.scss',
        src + 'app/service/**/*.scss',
        src + 'app/api/**/*.scss',
        src + 'app/petals/bus/bus-nav-console/*.scss',
        src + 'app/petals/server/server-nav-console/*.scss',
        src + 'app/workspace/*.scss',
        src + 'app/layout/appbar/*.scss',
        src + 'app/layout/sidenav/*.scss',
        src + 'app/layout/login/*.scss',
        src + 'app/layout/console/*.scss'
    ],

    $: $,
    args: require('yargs').argv,

    // --- Utilities ---
    log: function log(msg) {
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
    notify: function notify(options) {
        var notifier = require('node-notifier');
        notifier.notify(options);
    }

};
