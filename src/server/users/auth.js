var express = require('express');
var passport = require('passport');

var router = express.Router();

// log in
router.post('/login', function(req, res, next) {
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

router.get('/status', function(req, res) {
    if (req.user) {
        res.json({ username: req.user.username});
    } else {
        res.sendStatus(401);
    }
});

router.get('/logout', function(req, res) {
    req.logout();
    res.sendStatus(200);
});

module.exports = router;