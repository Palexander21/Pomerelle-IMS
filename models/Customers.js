const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        trim: true,
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /(\d{3})-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: false,
    },
    email: {
        type: String,
        trim: true,
        required: false,
    },
    previousRentals: {
        type: [String],
        required: true,
    },
}, {autoCreate: true});

module.exports = mongoose.model('Customers', CustomerSchema);
