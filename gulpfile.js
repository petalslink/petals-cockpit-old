/* jshint node: true, -W024, -W040, -W098, -W126 */

'use strict';

/**
 * yargs variables can be passed in to alter the behavior, when present.
 * Example: gulp serve-dev
 *
 * --verbose  : Various tasks will produce more output to the console.
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var src = './src/client';
var config = require('./gulp.config');
var buildTask = (function (config, taskFile) {
        require('./gulp-tasks/' + taskFile)(config);
    }).bind(null, config);

[
    'help',
    'serve',
    'vet',
    'styles',
    'clean',
    'plato',
    'assets',
    'template-cache',
    'inject',
    'optimize',
    'test',
    'bump'
].forEach(buildTask);


gulp.task('default', ['help']);

module.exports = gulp;
