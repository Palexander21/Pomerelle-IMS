const User = require('/src/models/Users');
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
    if (user){
        res.send(users);
    }
    else
        res.status(500).send('Failed to get users.')
};

controller.newUser = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        let user = await User.findOne({username: req.body.username});
        if (user) {
            return res.status(400).send({
                msg: 'User already exists',
            });
        } else if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).send({
                msg: 'Passwords do not match',
            });
        }
        else {
            user = new User(req.body);
            await user.save()
                .catch(err => {
                    res.status(500).send({
                        msg: err.message || 'Failed to create new user'
                    })
                });
            res.send(`User ${req.body.username} successfully created.`)
        }
    } else {
        console.error('Failed to validate POST request: ' + errors.array());
        return res.status(500).send({
            msg: 'Failed to validate POST, ensure all fields are filled',
        });
    }
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

controller.update = (req, res) => {

};

controller.delete = async (req, res) => {
    let user = await User.findOneAndRemove({username: req.params.username})
        .catch(err => {
            if (err.name === 'NotFound') {
                return res.status(404).send({
                    msg: `Could not find user: ${req.params.username}`
                })
            }
            return res.status(500).send({
                msg: `Could not delete user: ${req.params.username}`
            })
        });
    if (!user) {
        return res.status(404).send({
            msg: `Could not find user: ${req.params.username}`
        })
    }
    res.send({msg: 'User successfully deleted'})
};

module.exports = controller;