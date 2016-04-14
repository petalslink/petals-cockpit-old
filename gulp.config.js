/* jshint node: true, -W024, -W040, -W098, -W126 */

'use strict';

var $ = require('gulp-load-plugins')({lazy: true});
var src = './src/client/';
var server = './src/server/';

module.exports = {

    // --- Configurables ---
    nodeServer: server + 'app.js',
    defaultPort: '7203',
    sourceDir: src,
    serverDir: server,
    testDir: './test/',
    buildDir: './build/',
    tempDir: './.tmp/',
    js: [
        // MODULE
        src + 'app/**/*.module.js',

        // ALL
        src + 'app/**/*.js',
        src + 'app/**/**/*.js',
        src + 'app/**/**/**/*.js',
        src + 'app/core/*.js',
        src + 'app/blocks/**/*.js',

        // LAYOUT
        src + 'app/layout/**/*.js',
        src + 'app/layout/appbar/*js',
        src + 'app/layout/login/*.js',
        src + 'app/layout/sidenav/*js',

        // WORKSPACE
        src + 'app/workspace/*js',
        src + 'app/workspace/petals/*.js',
        src + 'app/workspace/service/*.js',
        src + 'app/workspace/api/*.js',

        // PETALS-COMPONENT
        src + 'app/petals-component/bus/*.js',
        src + 'app/petals-component/server/*.js',
        src + 'app/petals-component/bc-soap/*.js',
        src + 'app/petals-component/bc-rest/*.js',
        src + 'app/petals-component/bc-mail/*.js',
        src + 'app/petals-component/su/su-nav-console/*.js',

        // BC-SOAP, BUS, SERVER, SU
        src + 'app/petals-component/bus/**/*.js',
        src + 'app/petals-component/server/**/*.js',
        src + 'app/petals-component/bc-soap/**/*.js',
        src + 'app/petals-component/bc-rest/**/*.js',
        src + 'app/petals-component/bc-mail/**/*.js',
        src + 'app/petals-component/su/**/*.js'
    ],
    html: [
        // ALL
        src + '*.html',
        src + 'app/**/*html',
        src + 'app/**/**/*html',
        src + 'app/**/**/**/*html',

        // LAYOUT
        src + 'app/layout/appbar/*html',
        src + 'app/layout/login/*.html',
        src + 'app/layout/console/*.html',
        src + 'app/layout/sidenav/*html',

        // WORKSPACE
        src + 'app/workspace/*html',
        src + 'app/workspace/petals/*.html',
        src + 'app/workspace/service/*.html',
        src + 'app/workspace/api/*.html',

        // PETALS-COMPONENT
        src + 'app/petals-component/bus/*.html',
        src + 'app/petals-component/server/*.html',
        src + 'app/petals-component/bc-soap/*.html',
        src + 'app/petals-component/su/su-nav-console/*.html',
        src + 'app/petals-component/modals/*.html',

        // BC-SOAP, BUS, SERVER, SU ...
        src + 'app/petals-component/bus/**/*.html',
        src + 'app/petals-component/server/**/*.html',
        src + 'app/petals-component/bc-soap/*.html',
        src + 'app/petals-component/su/*.html'
    ],
    sass: [
        // ALL
        src + 'app/**/*.scss',
        src + 'app/**/**/*.scss',
        src + 'app/**/**/**/*.scss',
        src + 'app/core/**/*.scss',

        // LAYOUT
        src + 'app/layout/*.scss',

        // WORKSPACE
        src + 'app/workspace/*.scss',
        src + 'app/workspace/petals/*.scss',
        src + 'app/workspace/service/*.scss',
        src + 'app/workspace/api/*.scss',

        // PETALS-COMPONENT
        src + 'app/petals-component/server/config/**/*.scss',
        src + 'app/petals-component/bus/**/*.scss',
        src + 'app/petals-component/server/**/*.scss',
        src + 'app/petals-component/bc-soap/**/*.scss',

        // BC-SOAP, BUS, SERVER, SU
        src + 'app/petals-component/bus/*.scss',
        src + 'app/petals-component/server/*.scss',
        src + 'app/petals-component/bc-soap/*.scss',
        src + 'app/petals-component/su/su-nav-console/*.scss'


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
