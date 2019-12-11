const express = require('express'),
    { body, validationResult } = require('express-validator/check'),
    mongoose = require('mongoose'),
    users = mongoose.model('Users'),
    equipment = mongoose.model('Equipment'),
    customers = mongoose.model('Customers'),
    open_rentals = mongoose.model('OpenRentals'),
    rentals = mongoose.model('Rentals')
;

let controller = {};

controller.getDashboard = async (req, res, next) => {
    let new_count = await open_rentals.countDocuments()
        .catch(e => {
            console.error(`Failed to count open_rentals: ${e}`);
        });
    let return_count = await rentals.countDocuments({returned: false});
    return res.render('index', {
        title: 'Home',
        rentals: new_count,
        returns: return_count
    })
};

module.exports = controller;
