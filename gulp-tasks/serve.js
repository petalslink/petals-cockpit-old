'use strict';

var browserSync = require('browser-sync');
var url = require('url');
var proxy = require('proxy-middleware');
var gulp = require('gulp');
var watch = require('gulp-watch');
var modRewrite = require('connect-modrewrite');
var spawn = require('child_process').spawn;
var mkdirs = require('mkdirs');
var os = require('os');

module.exports = function (config) {

    gulp.task('populate-demo', [], function () {
        runCommand('mvn',
                ['-f',
                 '-B',
                 'java-server',
                 'compile',
                 'dependency:properties',
                 'exec:exec',
                 '-Dcockpit.exec.command=populate-demo'
                 ]);
    });

    gulp.task('serve-mongod', [], function() {
        serveMongod();
    });

    gulp.task('serve-java', [], function() {
        serveJava();
    });

    gulp.task('serve-dev', ['inject','vet'], function () {
        serve(true /*isDev*/);
    });

    gulp.task('serve-build', ['build'], function () {
        serve(false /*isDev*/);
    });

    function runCommand(command, args, name) {

        config.log('Starting '+name+': '+command+' '+args);

        var p = spawn(command, args);

        p.stdout.on('data', function(data) { log(data, config.log); });
        p.stderr.on('data', function(data) { log(data, config.err); });
        p.on('close', function(code) {
            if (code > 0) {
                throw new Error('child process exited with code '+code);
            }
        });

        process.on('exit', function() {
            p.kill();
        });

        return p;

        function log(data, logger) {
            data.toString().split(os.EOL).forEach(function(l) {
                if (l.trim().length > 0) {
                    logger(name+': '+l);
                }
            });
        }
    }

    function serveMongod() {
        var dbDir = config.dbDir;
        mkdirs(dbDir);
        mkdirs(dbDir+'/data');
        runCommand('mongod', ['--dbpath', dbDir+'/data'], 'mongo');
    }

    function serveJava(onStart) {
        var p = runCommand('mvn', ['-f', 'java-server', 'compile', 'dependency:properties', 'exec:exec'], 'server');

        if (onStart) {
            var cb = function(data) {
                if (data.indexOf('Started Petals Cockpit') > -1) {
                    p.stdout.removeListener('data', cb);
                    onStart();
                }
            };
            p.stdout.on('data', cb);
        }
    }

    /**
     * Start BrowserSync
     */
    function serve(isDev) {

        var port = process.env.PORT || config.defaultPort;

        if (isDev) {
            serveMongod();
        }

        serveJava(function() {
            startBrowserSync(isDev);
        });

        function startBrowserSync(isDev) {

            config.log('Starting BrowserSync on port ' + port);

            // If build: watches the files, builds, and restarts browser-sync.
            // If dev: watches less, compiles it to css, browser-sync handles reload
            var files = [].concat(config.js, config.html, config.sass);
            if (isDev) {
                watch(files, function() { gulp.start('inject', browserSync.reload); });
            } else {
                watch(files, function() { gulp.start('optimize', browserSync.reload); });
            }

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
};
