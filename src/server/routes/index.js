'use strict';

module.exports = function (app) {
    var data = '/../data/';
    var jsonfileservice = require('../utils/jsonfileservice')();

    app.get('/petalscomponent/:wkspce/:id', getPetalsComponent);
    app.get('/petalscomponents/:wkspce', getPetalsComponents);
    app.get('/petalscomponentsconfig/:wkspce', getPetalsComponentConfig);

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

};

