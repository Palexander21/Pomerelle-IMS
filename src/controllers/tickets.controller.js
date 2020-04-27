const { body, validationResult } = require('express-validator/check'),
    mongoose = require('mongoose');

let controller = {};

controller.get_ticketing = async function(req, res, next) {
    return res.render('ticketing', {
        title: 'Ticket Office',
        user: req.session.user,
        admin: req.session.role === 'admin',
    })
};




module.exports = controller;
