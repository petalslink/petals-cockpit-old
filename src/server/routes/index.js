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
        var msg = 'Petals Component ' + id + ' not found. ';
        try {
            var json = jsonfileservice.getJsonFromFile(data + wkspce + '/petalsComponent' + id + '.json');
            /*
             var petalsComponent = json.filter(function(c) {
             return c.id === parseInt(id);
             });
             if (customer && customer[0]) {
             res.send(customer[0]);
             } else {
             four0four.send404(req, res, msg);
             }
             */
            if (json) {
                res.send(json);
            } else {
                four0four.send404(req, req, msg);
            }
        }
        catch (ex) {
            four0four.send404(req, res, msg + ex.message);
        }
    }

    function getPetalsComponents(req, res, next) {
        var wkspce = req.params.wkspce;
        var msg = 'Petals Components not found. ';
        try {
            var json = jsonfileservice.getJsonFromFile(data + wkspce + '.json');
            if (json) {
                res.send(json);
            } else {
                four0four.send404(req, req, msg);
            }
        }
        catch (ex) {
            four0four.send404(req, res, msg + ex.message);
        }
    }

    function getPetalsComponentConfig(req, res, next) {
        var wkspce = req.params.wkspce;
        var msg = 'Petals Components Configuration not found. ';
        try {
            var json = jsonfileservice.getJsonFromFile(data + wkspce + 'ComponentConfig.json');
            if (json) {
                res.send(json);
            } else {
                four0four.send404(req, req, msg);
            }
        }
        catch (ex) {
            four0four.send404(req, res, msg + ex.message);
        }
    }

};

