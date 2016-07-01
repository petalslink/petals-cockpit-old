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

require('./routes/index')(app);

//// Initialize Passport
var initPassport = require('./passport-init');
initPassport.init(passport);

initPassport.addUser(null, 'admin', 'admin', function() {});

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.get('/ping', function(req, res, next) {
    console.log(req.body);
    res.send('pong');
});

//log in
app.post('/login', function(req, res, next) {
    passport.authenticate('login', function(err, user) {
        if (err) { return next(err); }
        if (!user) { return res.sendStatus(401); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.sendStatus(200);
        });
    })(req, res, next);
});

app.get('/logout', function(req, res){
    req.logout();
    res.sendStatus(200);
});

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});
