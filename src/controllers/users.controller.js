const mongoose = require('mongoose');
const User = mongoose.model('Users');
const {body, validationResult} = require('express-validator');

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
    let user = await User.findOne({username: req.params.username})
        .catch(err => {
            return res.status(500).send({
                msg: `Error retrieving user: ${req.params.username}`
            })
        });
    if(!user) {
        return res.status(404).send({
            msg: `User not found: ${req.params.username}`
        })
    }
    res.send(user);
};

module.exports = controller;