'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    created_at: {type: Date, default: Date.now}
});

var wsSchema = new Schema({
    name: String,
    buses: [{ type: Schema.Types.ObjectId, ref: 'Bus' }]
});

var busSchema = new Schema({
    name: String,
    version: String,
    servers: [{ type: Schema.Types.ObjectId, ref: 'Server' }]
});

var serverSchema = new Schema({
    name: String,
    version: String,
    ip: String,
    port: Number,
    state: {
        type: String,
        enum: [
            'Shutdown',
            'Started'
        ],
        default: 'Shutdown'
    },
    components: [{ type: Schema.Types.ObjectId, ref: 'Component' }]
});

var componentSchema = new Schema({
    name: String,
    version: String,
    state: {
        type: String,
        enum: [
            'Uninstalled',
            'Deployed',
            'Stopped',
            'Started'
        ],
        default: 'Uninstalled'
    },
    type: String,
    sus: [{ type: Schema.Types.ObjectId, ref: 'ServiceUnit' }]
});

var suSchema = new Schema({
    name: String,
    version: String,
    state: {
        type: String,
        enum: [
            'Undeployed',
            'Deployed',
            'Stopped',
            'Started'
        ],
        default: 'Undeployed'
    },
    type: {
        type: String,
        enum: [
            'CONSUME',
            'PROVIDE'
        ]
    }
});

module.exports = {
    User: mongoose.model('User', userSchema),
    Workspace: mongoose.model('Workspace', wsSchema),
    Bus: mongoose.model('Bus', busSchema),
    Server: mongoose.model('Server', serverSchema),
    Component: mongoose.model('Component', componentSchema),
    ServiceUnit: mongoose.model('ServiceUnit', suSchema)
};
