'use strict';

var express = require('express');
var models = require('../models/models');
var data = '/../data/';
var jsonfileservice = require('../utils/jsonfileservice')();

var router = express.Router();

//router.get('/workspace/:id', getWorkspacePetals);
router.get('/petalscomponent/:wkspce/:id', getPetalsComponent);
router.get('/petalscomponents/:wkspce', getWorkspacePetals);
router.get('/petalscomponentsconfig/:wkspce', getPetalsComponentConfig);

module.exports = router;

function getWorkspacePetals(req, res) {
    function populate(e) {
        // first populate the element itself (its type and its children)
        return models.PetalsComponent.populate(e, {path: 'children type'})
            // then populate his children (their type and children) by calling populate recursively
            .then(function (e) {
                var chain = Q.when();
                e.children.forEach(function(c) {
                    chain = chain.then(function() {
                        return populate(c);
                    })
                });
                return chain.then(function() {
                    // in the end we don't care about the results for the children
                    return Q.resolve(e);
                });
            });
    }

    models.PetalsComponentType.findOne({'name': 'WKSPCE'}).then(function (typeWs) {
        models.PetalsComponent.findOne({'name': req.params.id, 'type': typeWs._id})
    }).then(populate).then(function (ws) {
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
