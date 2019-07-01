const mongoose = require('mongoose');
const Customers = require('Customers');
const Equipment = require('Equipment');

const RentalsSchema = new mongoose.Schema({
    customer: Customers,
    equipment: [Equipment],
    date: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 50,
        trim: true,
    }



}, {autoCreate: true});

module.exports = mongoose.model('Rentals', RentalsSchema);
