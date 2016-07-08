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

models.PetalsComponent.findOne({name: 'demo', cat: 'WKSPCE'}).then(function (wkpce, w) {
    if (wkpce === null) {
        populateType();
    }
    if (w === null) {
        populateDemo();
    }
    else {
        console.log('Collections already exists !!')
    }
});

function populateType() {
    var cptSP = new models.PetalsComponentType({
        name: 'SU-PROVIDE',
        version: '2-5-6',
        cat: 'SU',
        subCat: 'PROVIDE'
    }).save();
    var cptSC = new models.PetalsComponentType({
        name: 'SU-CONSUME',
        version: '3-2-1',
        cat: 'SU',
        subCat: 'CONSUME'
    }).save();

    Q.all([cptSP, cptSC]).then(function (sus) {
        var cptSP = sus[0];
        var cptSC = sus[1];
        return new models.PetalsComponentType({
            name: 'BC-SOAP',
            version: '3-2',
            cat: 'COMPONENT',
            subCat: 'BC',
            contains: [cptSP._id, cptSC._id]
        }).save();
    }).then(function (compo) {
        return new models.PetalsComponentType({
            name: 'SERVER',
            version: '5-0-0',
            cat: 'SERVER',
            contains: [compo._id]
        }).save();
    }).then(function (serv) {
        return new models.PetalsComponentType({
            name: 'PETALS ESB',
            version: '5-0',
            cat: 'BUS',
            children: [serv._id]
        }).save();
    }).then(function (bus) {
        return new models.PetalsComponentType({
            name: 'WKSPCE',
            version: '1-0',
            cat: 'WKSPCE',
            children: [bus._id]
        }).save();
    }).then(function (wkpce) {
        console.log('Saved workspace type ' + wkpce.name);
    });
}

function populateDemo() {

    var sp1 = new models.PetalsComponent({
        name: 'SU-PROVIDE 1',
        type: '',
        state: 'Undeployed'
    }).save();
    var sc1 = new models.PetalsComponent({
        name: 'SU-CONSUME 1',
        type: '',
        state: 'Undeployed'
    }).save();
    Q.all([sp1, sc1]).then(function (sus) {
        var su1 = sus[0];
        var su2 = sus[1];
        return new models.PetalsComponent({
            name: 'BC-SOAP 1',
            type: '',
            state: 'Uninstalled',
            children: [su1._id, su2._id]
        }).save();
    }).then(function (c) {
        return new models.PetalsComponent({
            name: 'server 1',
            ip: '10.10.10.1',
            port: '4545',
            type: '',
            state: 'Shutdown',
            children: [c._id]
        }).save();
    }).then(function (s) {
        return new models.PetalsComponent({
            name: 'bus 1',
            type: '',
            state: 'Undeployed',
            children: [s._id]
        }).save();
    }).then(function (b) {
        return new models.PetalsComponent({
            name: 'demo',
            type: '',
            state: 'Undeployed',
            children: [b._id]
        }).save();
    }).then(function (w) {
        console.log('Saved workspace Demo ' + w.name);
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
