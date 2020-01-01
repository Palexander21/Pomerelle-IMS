'use strict';
const mongoose = require('mongoose'),
    Users = mongoose.model('Users'),
    acl = require('../config/security'),
    jwt = require('jsonwebtoken');

let auth = {};
auth.isLoggedIn = function (req, res, next) {
    if (req.session.user)
        next();
    else
        res.redirect('/users/login');

};

auth.api_auth = async function (req, res, next) {
    const header = req.headers.authorization;
    let result;
    if (header) {
        const token = req.headers.authorization.split(' ')[1];
        const options = {
            expiresIn: '1d',
        };
        try {
            result = jwt.verify(token, process.env.SECRET, options);
            req.decoded = result;
            next();
        } catch (err) {
            throw new Error(err);
        }
    } else {
        result = {
            error: `Authentication error. Token required.`,
            status: 401
        };
        return res.status(401).send(result);
    }
};

auth.isAuthorized = async function (req, res, next) {
    if (req.session) {
        let user = await Users.findOne({username: req.session.username})
            .catch(err => {
                return res.status(400).send({ msg: 'Failed retrieving user' })
            });
        let url = req.url;
        if (user) {
            acl.isAllowed(user.username, url , req.method.toLowerCase(), (err, allow) => {
                if (allow)
                    next();
                else
                    return res.render('unauthorized',
                        {
                            title: 'Unauthorized',
                            msg: 'User not authorized'
                        });
            });
        }
        else
            return res.redirect('/users/login');
    }
    else
        return res.redirect('/users/login');

};

auth.storeSession = function (req, res, next, user) {
    req.session.username = user.username;
    req.session.role = user.role;
    req.session.user = `${user.firstName} ${user.lastName}`;
    req.session.userId = user._id;
    req.session.save();
    req.token = jwt.sign({id: user._id}, process.env.SECRET, {
        expiresIn: '1d',
    });
    acl.addUserRoles(user.username, user.role, function (err) {
        if (err)
            console.error(err);
    });
    return new Promise(((resolve, reject) => {
        if (req.session.user)
            return resolve('Session Stored');
        else
            return reject('Failed to save Session');
    }))
};

module.exports = auth;
