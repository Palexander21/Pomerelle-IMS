const mongoose = require('mongoose');

const ConfigurationSchema = new mongoose.Schema({
    config : {
        type: String,
        required: true,
        trim: true,
    },
    id: {
        type: String,
        required: true,
        trim: true
    },

}, {autoCreate: true});

module.exports = mongoose.model('Configuration', ConfigurationSchema);
