const { body, validationResult } = require('express-validator/check'),
    mongoose = require('mongoose'),
    Kitchen = mongoose.model('Kitchen');

let controller = {};

controller.get_kitchen = async function(req, res, next) {
    let kitchen = await Kitchen.find()
        .catch(err => {
            console.next(err)
            return next(err)
        })
    return res.render('pos', {
        title: 'Kitchen',
        active: 'Kitchen',
        user: req.session.user,
        admin: req.session.role === 'admin',
        inventory: kitchen
    })
};




module.exports = controller;
