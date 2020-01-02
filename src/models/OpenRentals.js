const mongoose = require('mongoose');
const Customers = require('./Customers');
const customer_schema = Customers.model('Customers').schema;

const OpenRentalsSchema = new mongoose.Schema({
    customer: customer_schema

}, {autoCreate: true});

module.exports = mongoose.model('OpenRentals', OpenRentalsSchema);
