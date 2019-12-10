const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /\(\d{3}\)-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true,
    },
    address: {
        type: String,
        trim: true,
        required: true,
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    zipcode: {
        type: Number,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: false,
    },
    license: {
        type: String,
        trim: true,
        required: true,
    },
    rentalDate: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    previousRentals: {
        type: [String],
        required: true,
    },
    skierType: {
        type: Number,
        trim: true,
    },
    weight: {
        type: Number,
        trim: true,
    },
    heightFt: {
        type: Number,
        trim: true,
    },
    heightIn: {
        type: Number,
        trim: true,
    },
    age: {
        type: Number,
        trim: true,
    },
    bootSize: {
        type: Number,
        trim: true,
    },
    gender: {
        type: String,
        trim: true,
        required: true,
    },
    skiSchool: {
        type: String,
        trim: true,
        required: true,
    },
}, {autoCreate: true});

module.exports = mongoose.model('Customers', CustomerSchema);
