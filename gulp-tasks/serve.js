'use strict';

var browserSync = require('browser-sync');
var url = require('url');
var proxy = require('proxy-middleware');
var gulp = require('gulp');
var watch = require('gulp-watch');
var modRewrite = require('connect-modrewrite');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy: true});
var exec = require('child_process').exec;
var mkdirs = require('mkdirs');

//var config = require('./gulp.config')();
//var port = process.env.PORT || config.defaultPort;

module.exports = function (config) {

    gulp.task('serve-dev', ['inject','vet'], function () {
        serve(true /*isDev*/);
    });

    gulp.task('serve-build', ['build'], function () {
        serve(false /*isDev*/);
    });

    var runCommand = function(command) {
        exec(command, function (err, stdout, stderr) {
            config.log(stdout);
            config.log(stderr);
            if (err !== null) {
                config.log('exec error: ' + err);
            }
        });
    };

    /**
     * Start BrowserSync
     */
    function serve(isDev) {

        var port = process.env.PORT || config.defaultPort;

        var debug = args.debug || args.debugBrk;
        var debugMode = args.debug ? '--debug' : args.debugBrk ? '--debug-brk' : '';
        var nodeOptions = getNodeOptions(isDev);

        if (debug) {
            runNodeInspector();
            nodeOptions.nodeArgs = [debugMode + '=5858'];
        }

        if (args.verbose) {
            config.log(nodeOptions);
        }

        if (isDev) {
            startMongo(config.dbDir);
        }

        return $.nodemon(nodeOptions)
            .on('restart', ['vet'], function(ev) {
                config.log('*** nodemon restarted');
                config.log('files changed:\n' + ev);
                setTimeout(function() {
                    browserSync.notify('reloading now ...');
                    browserSync.reload({stream: false});
                }, config.browserReloadDelay);
            })
            .on('start', function () {
                config.log('*** nodemon started');
                startBrowserSync(isDev);
            })
            .on('crash', function () {
                config.log('*** nodemon crashed: script crashed for some reason');
            })
            .on('exit', function () {
                config.log('*** nodemon exited cleanly');
                stopMongo();
            });

        function getNodeOptions(isDev) {
            return {
                script: config.nodeServer,
                delayTime: 1,
                env: {
                    'PORT': port,
                    'NODE_ENV': isDev ? 'dev' : 'build'
                },
                watch: [config.serverJs]
            };
        }

        function startBrowserSync(isDev) {
/*
            if (args.nosync || browserSync.active) {
                return;
            }
*/

            config.log('Starting BrowserSync on port ' + port);

            // If build: watches the files, builds, and restarts browser-sync.
            // If dev: watches less, compiles it to css, browser-sync handles reload
            var files = [].concat(config.js, config.html, config.sass);
            if (isDev) {
                watch(files, function() { gulp.start('inject', browserSync.reload); });
            } else {
                watch(files, function() { gulp.start('optimize', browserSync.reload); });
            }
/*
            if (isDev) {
                gulp.watch([config.less], ['styles'])
                    .on('change', changeEvent);
            } else {
                gulp.watch([config.less, config.js, config.html], ['browserSyncReload'])
                    .on('change', changeEvent);
            }
*/
            var proxyOpts = url.parse('http://localhost:' + port);
            proxyOpts.route = '/api';

            var options = {
                server: {
                    baseDir: isDev ? config.tempDir : config.buildDir,
                    routes: isDev ? {
                        '/bower_components': './bower_components',
                        '/fonts': './bower_components/bootstrap-sass/assets/fonts',
                        '/src/client': config.sourceDir,
                        '/images': config.sourceDir + 'images',
                        '/.tmp': config.tempDir
                    } : {},
                    middleware: [
                        proxy(proxyOpts),
                        modRewrite([ '!\\.\\w+$ /index.html [L]' ])
                    ]
                },
                ghostMode: {
                    clicks: true,
                    location: false,
                    forms: true,
                    scroll: true
                },
                injectChanges: true,
                logFileChanges: true,
                logLevel: 'info',
                logPrefix: 'Petals Cockpit',
                notify: true,
                reloadDelay: 0 //1000
            } ;

            browserSync(options);
        }

    }

    function startMongo(dbDir) {
        var command = 'mongod --dbpath '+dbDir+'/data &';
        mkdirs(dbDir);
        mkdirs(dbDir+'/data');
        config.log('Starting mongodb');
        runCommand(command);
    }

    function stopMongo() {
        var command = 'mongo admin --eval "db.shutdownServer();"';
        config.log('Stopping mongodb');
        runCommand(command);
    }

    function runNodeInspector() {
        config.log('Running node-inspector.');
        config.log('Browse to http://localhost:8080/debug?port=5858');
        exec('node-inspector');
    }
};
