const { body, validationResult } = require('express-validator/check'),
    mongoose = require('mongoose'),
    Users = mongoose.model('Users'),
    Equipment = mongoose.model('Equipment');

let controller = {};

controller.get_tables = async function(req, res, next) {
    let equipment = await Equipment.find()
        .catch((err) => {
            console.error(`Failed to find equipment: ${err}`);
            res.send('Failed to find equipment');
        });
    let users = await Users.find()
        .catch((err) => {
            console.error(`Failed to find users: ${err}`);
            res.send('Failed to find users');
        });

    res.render('tables', {
        title: 'Tables',
        user: req.session.user,
        users: users,
        equipment: equipment,
        admin: req.session.role === 'admin',
    });
};




module.exports = controller;
