const { body, validationResult } = require('express-validator/check'),
    mongoose = require('mongoose'),
    Ticket = mongoose.model('Tickets');

let controller = {};

controller.get_ticketing = async function(req, res, next) {
    let tickets = await Ticket.find()
        .catch(err => {
            console.next(err)
            return next(err)
        })
    return res.render('pos', {
        title: 'Ticket Office',
        active: 'Ticket Office',
        user: req.session.user,
        admin: req.session.role === 'admin',
        inventory: tickets
    })
};




module.exports = controller;
