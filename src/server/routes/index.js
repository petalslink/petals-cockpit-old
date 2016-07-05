'use strict';

var express = require('express');

var data = '/../data/';
var jsonfileservice = require('../utils/jsonfileservice')();

var router = express.Router();

router.get('/petalscomponent/:wkspce/:id', getPetalsComponent);
router.get('/petalscomponents/:wkspce', getPetalsComponents);
router.get('/petalscomponentsconfig/:wkspce', getPetalsComponentConfig);

module.exports = router;

function getPetalsComponent(req, res, next) {
    var wkspce = req.params.wkspce;
    var id = req.params.id;
    try {
        var json = jsonfileservice.getJsonFromFile(data + wkspce + '/petalsComponent' + id + '.json');
        if (json) {
            res.send(json);
        } else {
            res.status(404);
        }
    }
    catch (ex) {
        console.error(ex.stack);
        res.status(500);
    }
}

function getPetalsComponents(req, res, next) {
    var wkspce = req.params.wkspce;
    try {
        var json = jsonfileservice.getJsonFromFile(data + wkspce + '.json');
        if (json) {
            res.send(json);
        } else {
            res.status(404);
        }
    }
    catch (ex) {
        console.error(ex.stack);
        res.status(500);
    }
}

function getPetalsComponentConfig(req, res, next) {
    var wkspce = req.params.wkspce;
    try {
        var json = jsonfileservice.getJsonFromFile(data + wkspce + 'ComponentConfig.json');
        if (json) {
            res.send(json);
        } else {
            res.status(404);
        }
    }
    catch (ex) {
        console.error(ex.stack);
        res.status(500);
    }
}