/*
**
    L'application Node.js côté serveur qui gère les interactions avec les différents clients
**
*/
'use strict'

var app = require('express')();
var express = require('express');
var http = require('http');
var ent = require('ent'); // Permet de bloquer les caractères HTML
var server = http.createServer(app);
var fs = require('fs');
var ent = require('ent');
var i18n = require('i18n');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');
var notifier = require('node-notifier');
var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var userSchema = require('./backend/dbModels/user');

var home = function(req,res){
    res.render('home')
}
var about = function(req,res){
    res.render('about')
}
var guide = function(req,res){
    res.render('guide')
}
var contact = function(req,res){
    res.render('contact')
}

// create a new user called chris
var chris = new userSchema({
    name: 'Chris',
    username: 'sevilayha',
    password: 'password' 
});

// connect to db with mongoose
mongoose.connect('mongodb://localhost/mydb');

// call the built-in save method to save to the database
chris.save(function(err, saved){
    if(err){
        console.log("User is already saved !");
    }
    if(saved){
        console.log("User saved successfully !");
    }
});

i18n.configure({
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    directory: __dirname + '/backend/i18n/locales',
    updateFiles: false,
    indent: '  ',
    extension: '.json',
    cookie: 'locale'
});

// all environments
app.set('views', path.join(__dirname, 'frontend/public/views'));
app.set('view engine', 'jade');

app.set('port', 8080);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'secret password' }));
app.use(methodOverride());
app.use(require('stylus').middleware({ src: __dirname + '/frontend/public' }));
app.use(express.static(path.join(__dirname, '/frontend/public')));
app.use('/js', express.static( __dirname + '/frontend/js'));
app.use('/components', express.static( __dirname + '/frontend/public/components'));
app.use('/img', express.static( __dirname + '/frontend/public/img'));
app.use('/assets', express.static( __dirname + '/frontend/public/assets'));
app.use('/css', express.static( __dirname + '/frontend/public/css'));
app.use(i18n.init);

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler({log: errorNotification}))
}

function errorNotification(err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url

  notifier.notify({
    title: title,
    message: str
  })
}

app.get('/', home);
app.get('/home', home);

app.get('/views/*', function(req, res, next) {
  var templateName = req.params[0].replace(/\.html$/, '');
  res.render(templateName);
});

//app.get('/users', function(req, res) {
//  mongoose.model('users').find(function(err, users) {
//    res.send(users);
//  });
//});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
})

module.exports = app;