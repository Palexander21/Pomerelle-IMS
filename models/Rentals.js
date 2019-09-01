const mongoose = require('mongoose');
const Customers = require('./Customers');
const Equipment = require('./Equipment');
const equipment_schema = Equipment.model('Equipment').schema;
const customer_schema = Customers.model('Customers').schema;

const RentalsSchema = new mongoose.Schema({
    customer: customer_schema,
    date: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    equipment: [equipment_schema],
    technician: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    returned: {
        type: Boolean,
    },
    note: String

}, {autoCreate: true});

module.exports = mongoose.model('Rentals', RentalsSchema);
