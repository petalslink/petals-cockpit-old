// l'application Node.js côté serveur qui gère les interactions avec les différents clients
'use strict'

var app = require('express')(),
    express = require('express'),
    http = require('http'),
    server = http.createServer(app),
    ent = require('ent'), // Permet de bloquer les caractères HTML
    fs = require('fs'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    i18n = require('i18n');

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
app.set('views', path.join(__dirname, 'frontend/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/js', express.static( __dirname + '/frontend/js'));
app.use('/components', express.static( __dirname + '/frontend/components'));
app.use('/img', express.static( __dirname + '/frontend/img'));
app.use('/assets', express.static( __dirname + '/frontend/assets'));
app.use('/css', express.static( __dirname + '/frontend/css'));
app.use(i18n.init);

app.get('/', home);
app.get('/home', home);

app.get('/views/*', function(req, res, next) {
  var templateName = req.params[0].replace(/\.html$/, '');
  res.render(templateName);
});

var port =process.env.PORT || 8080;
app.listen(port);
module.exports = app;