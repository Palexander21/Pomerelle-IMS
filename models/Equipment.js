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
        minlength: 6,
        maxlength: 50,
        trim: true,
    },
    last_tune: {
        type: String,
        required: false,
        minlength: 6,
        maxlength: 50,
        trim: true,
    },
    upc: {
        type: String,
        trim: true,
    },
}, {autoCreate: true});

module.exports = mongoose.model('Equipment', EquipmentSchema);
