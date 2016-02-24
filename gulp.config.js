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
        src + 'app/components/approot/*js',
        src + 'app/components/appbar/*js',
        src + 'app/**/*.js'
    ],
    html: [
        src + '*.html',
        src + 'app/**/*html',
        src + 'app/**/**/*html',
        src + 'app/components/sidenav/*html',
        src + 'app/components/apptabs/*html',
        src + 'app/components/approot/*html',
        src + 'app/components/appbar/*html'
    ],
    sass: [
        src + 'app/**/*.scss',
        src + 'app/**/**/*.scss',
        src + 'app/core/**/*.scss',
        src + 'app/petals/**/*.scss',
        src + 'app/components/appbar/*.scss',
        src + 'app/components/apptabs/*.scss',
        src + 'app/components/sidenav/*.scss'
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
