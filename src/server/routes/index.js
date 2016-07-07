'use strict';

var express = require('express');
var models = require('../models/models');
var data = '/../data/';
var jsonfileservice = require('../utils/jsonfileservice')();

var router = express.Router();

function getWorkspacePetals(req, res) {
    models.Workspace.findOne({'name': req.params.id})
        .populate({
            path: 'buses',
            populate: {
                path: 'servers',
                populate: {
                    path: 'components',
                    populate: {path: 'sus'}
                }
            }
        }).then(function (ws) {
        if (ws) {
            res.json(ws);
        } else {
            res.sendStatus(404);
        }
    });
}

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

router.get('/workspace/:id', getWorkspacePetals);
router.get('/petalscomponent/:wkspce/:id', getPetalsComponent);
router.get('/petalscomponents/:wkspce', getPetalsComponents);
router.get('/petalscomponentsconfig/:wkspce', getPetalsComponentConfig);

module.exports = router;
