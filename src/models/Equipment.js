const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        trim: true,
    },
    size: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        trim: true,
    },
    last_used: {
        type: String,
        required: false,
        maxlength: 50,
        trim: true,
    },
    last_tune: {
        type: String,
        required: false,
        maxlength: 50,
        trim: true,
    },
    rt: {
        type: String,
        required: false,
        trim: true,
    },
    lt: {
        type: String,
        required: false,
        trim: true,
    },
    rth: {
        type: String,
        required: false,
        trim: true,
    },
    lth: {
        type: String,
        required: false,
        trim: true,
    },
    number: {
        type: String,
        trim: true,
    },
    note: {
        type: String,
        trim: false,
    }
}, {autoCreate: true});

module.exports = mongoose.model('Equipment', EquipmentSchema);
