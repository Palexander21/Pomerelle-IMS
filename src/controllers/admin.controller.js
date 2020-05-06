const { body, validationResult } = require('express-validator/check'),
    mongoose = require('mongoose'),
    Users = mongoose.model('Users'),
    Equipment = mongoose.model('Equipment'),
    Tickets = mongoose.model('Tickets'),
    Kitchen = mongoose.model('Kitchen');

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

controller.get_tickets_config = async function (req, res, next) {
    let tickets = await Tickets.find()
        .catch(err => {
            console.next(err);
            return next(err);
        });
    res.render('pos_config', {
        title: 'Configure | Tickets',
        active: 'Tickets',
        user: req.session.user,
        admin: req.session.role === 'admin',
        inventory: tickets
    });
};

controller.get_kitchen_config = async function (req, res, next) {
    let items = await Kitchen.find()
        .catch(err => {
            console.next(err);
            return next(err);
        });
    res.render('pos_config', {
        title: 'Configure | Kitchen',
        active: 'Kitchen',
        user: req.session.user,
        admin: req.session.role === 'admin',
        inventory: items
    });
};

controller.get_inventory = async function (req, res, next) {
        res.render('inventory', {
            title: 'Inventory',
            user: req.session.user,
            admin: req.session.role === 'admin',
        });
}

controller.get_equipment_inventory = async function (req, res, next) {
    let equipment = await Equipment.find()
        .catch((err) => {
            console.error(`Failed to find equipment: ${err}`);
            res.send('Failed to find equipment');
        });
    res.render('equipment', {
        title: 'Inventory | Equipment',
        user: req.session.user,
        equipment: equipment,
        admin: req.session.role === 'admin',
    });
}

controller.get_kitchen_inventory = async function (req, res, next) {
    let items = await Kitchen.find()
        .catch(err => {
            console.next(err);
            return next(err);
        });
    res.render('kitchen_inventory', {
        title: 'Inventory | Kitchen',
        user: req.session.user,
        admin: req.session.role === 'admin',
        items: items
    });
};

controller.get_ticket_inventory = async function (req, res, next) {
    let tickets = await Tickets.find()
        .catch(err => {
            console.next(err);
            return next(err);
        });
    res.render('ticket_inventory', {
        title: 'Inventory | Tickets',
        user: req.session.user,
        admin: req.session.role === 'admin',
        tickets: tickets
    });
};
module.exports = controller;
