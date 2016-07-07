var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var dbURI = 'mongodb://localhost/petals_cockpit_db';
var bCrypt = require('bcrypt-nodejs');
var Q = require('q');

mongoose.connect(dbURI);

// To start manually mongo use this line cmd on node : mongod --dbpath ./db/data
var db = mongoose.connection;

// Connection events
db.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
db.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
db.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
db.once('open', function () {
    // we're connected!
});

// Bring in your schemas & models
var models = require('./models');

addUser(null, 'admin', 'admin', function () {
});

models.Workspace.findOne({name: 'demo'}).then(function (ws) {
    if (ws === null) {
        populateDemo();
    } else {
        console.log('Collections already exists !!')
    }
});

function populateDemo() {

    var sp1 = new models.ServiceUnit({
        name: 'SU-PROVIDE 1',
        version: '3-2-1',
        state: 'Undeployed',
        type: 'PROVIDE'
    }).save();
    var sc1 = new models.ServiceUnit({
        name: 'SU-CONSUME 1',
        version: '3-2-1',
        state: 'Undeployed',
        type: 'CONSUME'
    }).save();

    Q.all([sp1, sc1]).then(function (sus) {
        var su1 = sus[0];
        var su2 = sus[1];
        return new models.Component({
            name: 'BC-SOAP 1',
            version: '3-2',
            state: 'Uninstalled',
            type: 'BC-SOAP',
            sus: [su1._id, su2._id]
        }).save();
    }).then(function (c) {
        return new models.Server({
            name: 'server 1',
            version: '5-0-0',
            ip: '10.10.10.1',
            port: '4545',
            state: 'Shutdown',
            components: [c._id]
        }).save();
    }).then(function (s) {
        return new models.Bus({
            name: 'bus 1',
            version: '5-0',
            servers: [s._id]
        }).save();
    }).then(function (b) {
        return new models.Workspace({
            name: 'demo',
            buses: [b._id]
        }).save();
    }).then(function (w) {
        console.log('Saved workspace ' + w.name);
    });
}

function addUser(req, username, password, done) {

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

    // find a user in mongo with provided username
    models.User.findOne({ 'username' :  username }, function(err, user) {
        // In case of any error, return using the done method
        if (err){
            console.log('Error in SignUp: '+err);
            return done(err);
        }
        // already exists
        if (user) {
            console.log('User already exists with username: '+username);
            return done(null, false);
        } else {
            // if there is no user, create the user
            var newUser = new models.User();

            // set the user's local credentials
            newUser.username = username;
            newUser.password = createHash(password);

            // save the user
            newUser.save(function(err) {
                if (err){
                    console.log('Error in Saving user: '+err);
                    throw err;
                }
                console.log(newUser.username + ' Registration successful');
                return done(null, newUser);
            });
        }
    });
}

module.exports.addUser = addUser;
