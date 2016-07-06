/*jshint node:true*/
'use strict';

var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var errorHandler = require('./utils/errorHandler')();
var logger = require('morgan');
var port = process.env.PORT || 7203;
var environment = process.env.NODE_ENV;
var passport = require('passport');
var database = require('./models/database');
var routes = require('./routes/index');
var auth = require('./users/auth');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compress());
app.use(logger('dev'));
app.use(errorHandler.init);

// session-related configuration
app.use(cookieParser());
app.use(expressSession({ secret: 'mySecret' }));
app.use(passport.initialize());
app.use(passport.session());

require('./users/users-passport');

app.use('/auth', auth);
app.use('/', routes);

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.get('/ping', function(req, res, next) {
    console.log(req.body);
    res.send('pong');
});

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});
