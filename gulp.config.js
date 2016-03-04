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
        src + 'app/components/**/*.js',
        src + 'app/components/sidenav/*js',
        src + 'app/components/apptabs/*js',
        src + 'app/components/workspace/*js',
        src + 'app/components/appbar/*js',
        src + 'app/components/login/*.js',
        src + 'app/**/*.js',
        src + 'app/petals/console/nav-console/*.js',
        src + 'app/components/console/*.js',
        src + 'app/petals/bus/config/**/*.js',
        src + 'app/petals/bus/**/**/*.js',
        src + 'app/petals/server/config/**/*.js',
        src + 'app/petals/server/**/**/*.js'
    ],
    html: [
        src + '*.html',
        src + 'app/**/*html',
        src + 'app/**/**/*html',
        src + 'app/components/sidenav/*html',
        src + 'app/components/apptabs/*html',
        src + 'app/components/workspace/*html',
        src + 'app/components/appbar/*html',
        src + 'app/components/login/*.html',
        src + 'app/components/console/*.html',
        src + 'app/petals/*.html',
        src + 'app/petals/bus/**/*.html',
        src + 'app/petals/server/**/*.html',
        src + 'app/petals/console/nav-console/*.html',
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
        src + 'app/petals/console/nav-console/*.scss',
        src + 'app/components/workspace/*.scss',
        src + 'app/components/appbar/*.scss',
        src + 'app/components/apptabs/*.scss',
        src + 'app/components/sidenav/*.scss',
        src + 'app/components/login/*.scss',
        src + 'app/components/console/*.scss'
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
