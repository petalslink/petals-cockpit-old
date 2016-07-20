'use strict';

var browserSync = require('browser-sync');
var url = require('url');
var proxy = require('proxy-middleware');
var gulp = require('gulp');
var watch = require('gulp-watch');
var modRewrite = require('connect-modrewrite');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var mkdirs = require('mkdirs');

module.exports = function (config) {

    gulp.task('populate-demo', [], function() {
        exec('mvn -f java-server compile dependency:properties exec:exec -Dcockpit.exec.command=populate-demo', function(error, stdout, stderr) {
            if (error) {
                config.log('exec error: '+error);
            }
            console.log('stdout: ' +stdout);
            console.log('stderr: ' + stderr);
        });
    });
    
    gulp.task('serve-dev', ['inject','vet'], function () {
        serve(true /*isDev*/);
    });

    gulp.task('serve-build', ['build'], function () {
        serve(false /*isDev*/);
    });

    var runCommand = function(command, args, name) {
        config.log('Starting '+name+': '+command+' '+args);
        var p = spawn(command, args);
        p.stdout.on('data', function(data) {
            config.log(name+': '+data);
        });
        p.stderr.on('data', function(data) {
            config.log(name+' (err): '+data);
        });
        p.on('close', function(code) {
            config.log('child process exited with code '+code);
        });
        return p;
    };

    /**
     * Start BrowserSync
     */
    function serve(isDev) {

        var port = process.env.PORT || config.defaultPort;

        if (isDev) {
            var dbDir = config.dbDir;
            mkdirs(dbDir);
            mkdirs(dbDir+'/data');
            runCommand('mongod', ['--dbpath', dbDir+'/data'], 'mongo');
        }

        var p = runCommand('mvn', [ '-f', 'java-server', 'compile', 'dependency:properties', 'exec:exec'], 'server');

        // TODO remove listener once BS is started
        p.stdout.on('data', function(data) {
            if (data.indexOf('Started Petals Cockpit') > -1) {
                startBrowserSync(isDev);
            }
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
