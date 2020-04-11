const mongoose = require('mongoose');
const User = mongoose.model('Users');
const {body, validationResult} = require('express-validator/check');
const bcrypt = require('bcrypt');
const auth = require('../../../../src/middleware/auth');

let controller = {};

controller.findAll = async (req, res) => {
    let users = await User.find()
        .catch(err => {
            console.error(`Failed to get users: ${err.message}`);
            return res.status(404).send({
                message: err.message || "Failed to get users."
            });
        });
    if (users){
        return res.send(users);
    }
    else
        return res.status(404).send('Failed to get users.')
};

controller.findUser = async (req, res, next) => {
    let user = await User.findOne({username: req.params.username})
        .catch(err => {
            return res.status(404).send({
                message: err.message || `Failed to find user ${req.params.username}`
            })
        });
    if (user) {
        return res.send(user);
    }
    else
        return res.status(404).send('Failed to get users');
};

controller.newUser = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        let user = await User.findOne({username: req.body.username});
        if (user) {
            return res.status(409).send({
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
                    return res.status(500).send({
                        msg: err.message || 'Failed to create new user'
                    })
                });
            return res.status(201).send({
                msg: `User ${req.body.username} successfully created.`
        })
        }
    } else {
        console.error('Failed to validate POST request: ' + errors.array());
        return res.status(400).send({
            msg: 'Failed to validate POST, ensure all fields are filled',
        });
    }
};

controller.login = async (req, res, next) => {
    let user = await User.findOne({username: req.body.username})
        .catch(err => {
            return res.status(404).send({
                msg: `Error retrieving user: ${req.body.username}`
            })
        });
    if (!user) {
        return res.status(404).send({
            msg: `User not found: ${req.body.username}`
        })
    } else {
        bcrypt.compare(req.body.password, user.password, (err, success) => {
            if (success) {
                auth.storeSession(req, res, next, user)
                    .then(function () {
                        const options = {
                            httpOnly: true,
                            maxAge: 3600000
                        };
                        return res.status(201).cookie('jwt', req.token, options).send({
                            msg: user.username + ' successfully logged in.',
                            session: req.session,
                            token: req.token
                     })
                }).catch(err => {
                    console.error(err)
                });
            } else {
                return res.status(400).send({
                    msg: 'Incorrect password'
                })
            }
        });
    }
};

controller.logout = (req, res, next) => {
    if (req.session)
        req.session.destroy((err) => {
            if (err)
                return next(err);
            else
                return res.send({ msg: 'User successfully logged out '})
        })
};

controller.update = async (req, res) => {
    let user = await User.updateOne({_id: req.params.id}, req.body)
        .catch(err => {
            if (err.name === 'NotFound') {
                return res.status(404).send({
                    msg: `Could not find user: ${req.params.id}`
                })
            }
            return res.status(500).send({
                msg: `Could not update user: ${req.params.id}`
            })
        });
    if (!user) {
        return res.status(404).send({
            msg: `Could not find user: ${req.params.id}`
        })
    }
    let ret = await User.findOne({_id:req.params.id});
    return res.send({
        msg: 'User successfully updated',
        user: ret
    })
};

controller.delete = async (req, res) => {
    let user = await User.deleteOne({username: req.params.username})
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
    return res.send({msg: 'User successfully deleted'})
};

module.exports = controller;