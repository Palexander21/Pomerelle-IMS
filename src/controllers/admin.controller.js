const { body, validationResult } = require('express-validator/check'),
    mongoose = require('mongoose'),
    Users = mongoose.model('Users'),
    Tickets = mongoose.model('Tickets');

let controller = {};

controller.get_admin = function (req, res, next) {
   res.render('admin', {
       title: 'Admin',
       user: req.session.user,
       admin: req.session.role === 'admin',
   });
};

controller.get_users = async function (req, res, next) {
    let users = await Users.find()
        .catch(err => {
            console.next(err);
            return next(err);
        });
    res.render('users', {
        title: 'Users',
        user: req.session.user,
        admin: req.session.role === 'admin',
        users: users,
    });
};

controller.get_configure = function (req, res, next) {
    res.render('configure', {
        title: 'Configure',
        user: req.session.user,
        admin: req.session.role === 'admin',
    });
};

controller.get_ticketing = async function (req, res, next) {
    let tickets = await Tickets.find()
        .catch(err => {
            console.next(err);
            return next(err);
        });
    res.render('ticket_config', {
        title: 'Configure | Tickets',
        user: req.session.user,
        admin: req.session.role === 'admin',
        tickets: tickets
    });
};

controller.get_kitchen = function (req, res, next) {
    res.render('kitchen_config', {
        title: 'Configure | Kitchen',
        user: req.session.user,
        admin: req.session.role === 'admin',
    });
};

module.exports = controller;
