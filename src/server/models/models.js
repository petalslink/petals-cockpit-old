'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    created_at: {type: Date, default: Date.now}
});

var petalsComponentSchema = new Schema({
    name: String,
    type: { type: Schema.Types.ObjectId, ref: 'PetalsComponentType' },
    //config: { type: Schema.Types.ObjectId, ref: 'PetalsComponentConfig' },
    state: {
        type: String,
        enum: [
            'Uninstalled',
            'Undeployed',
            'Deployed',
            'Shutdown',
            'Stopped',
            'Started'
        ],
        default: 'Undeployed'
    },
    ip: String,
    port: Number,
    children: [{ type: Schema.Types.ObjectId, ref: 'PetalsComponent' }]
});

var petalsComponentTypeSchema = new Schema({
    name: String,
    version: String,
    cat: String,
    subCat: String,
    //acceptedContent: Array,
    contains: [{ type: Schema.Types.ObjectId, ref: 'petalsComponentTypeSchema' }]
});

var petalsComponentConfigSchema = new Schema({
    content: Schema.Types.Mixed
});

module.exports = {
    User: mongoose.model('User', userSchema),
    PetalsComponent: mongoose.model('PetalsComponent', petalsComponentSchema),
    PetalsComponentType: mongoose.model('PetalsComponentType', petalsComponentTypeSchema),
    PetalsComponentConfig: mongoose.model('PetalsComponentConfig', petalsComponentConfigSchema)
};
