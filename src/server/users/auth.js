var express = require('express');

module.exports = function() {

    var router = express.Router();

    // log in
    app.post('/login', function(req, res, next) {
        passport.authenticate('login', function(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.sendStatus(401);
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.sendStatus(200);
            });
        })(req, res, next);
    });

    app.get('/status', function(req, res) {
        if (req.user) {
            res.json({ username: req.user.username});
        } else {
            res.sendStatus(401);
        }
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.sendStatus(200);
    });

    return router;

};