const mongoose = require('mongoose');
const User = mongoose.model('Users');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

let controller = {};

controller.findAll = async (req, res) => {
    let users = await User.find()
        .catch(err => {
            console.error(`Failed to get users: ${err.message}`);
            res.status(500).send({
                message: err.message || "Failed to get users."
            });
        });
    if (users){
        res.send(users);
    }
    else
        res.status(500).send('Failed to get users.')
};

controller.login = async (req, res) => {
    return res.render('login')

};

module.exports = controller;