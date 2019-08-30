const mongoose = require('mongoose');
const Customers = require('./Customers');
const Equipment = require('./Equipment');
const equipment_schema = Equipment.model('Equipment').schema;
const customer_schema = Customers.model('Customers').schema;

const RentalsSchema = new mongoose.Schema({
    customer: customer_schema,
    equipment: [equipment_schema],
    date: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    returned: {
        type: Boolean,
    }



}, {autoCreate: true});

module.exports = mongoose.model('Rentals', RentalsSchema);
