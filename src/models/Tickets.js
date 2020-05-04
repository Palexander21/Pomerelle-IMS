const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    ticket: {
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
