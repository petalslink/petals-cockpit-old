// l'application Node.js côté serveur qui gère les interactions avec les différents clients
'use strict'

var app = require('express')(),
    express = require('express'),
    http = require('http'),
    server = http.createServer(app),
//    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractères HTML
    fs = require('fs'),
    //home = require('./frontend/routes/home'),
    about = require('./frontend/routes/about'),
    guide = require('./frontend/routes/guide'),   
    contact = require('./frontend/routes/contact'),
    path = require('path'),
//    favicon = require('static-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    i18n = require('i18n');

var home = function(req,res){
    res.render('home')
}

//i18n.configure({
//    locales:['en', 'de'],
//    directory: __dirname + '../locales'
//});

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

//app.use(favicon());
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
app.get('/about', about.about);
app.get('/guide', guide.guide);
app.get('/contact', contact.contact);

app.get('/views/*', function(req, res, next) {
  var templateName = req.params[0].replace(/\.html$/, '');
  res.render(templateName);
});

//exports.partials = function(req, res){
//    var name = req.params.name;
//    res.render('partials/' + name);
//}

var port =process.env.PORT || 8080;
app.listen(port);
module.exports = app;





