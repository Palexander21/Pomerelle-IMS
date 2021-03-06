const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },

}, {autoCreate: true});

module.exports = mongoose.model('Tickets', TicketSchema);
