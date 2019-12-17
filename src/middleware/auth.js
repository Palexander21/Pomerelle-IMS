'use strict';
const mongoose = require('mongoose'),
    Users = mongoose.model('Users'),
    acl = require('../config/security');

let auth = {};
auth.isLoggedIn = function (req, res, next) {
    if (req.session.user)
        next();
    else
        res.redirect('/users/login');

};

auth.isAuthorized = async function (req, res, next) {
    if (req.session) {
        let user = await Users.findOne({username: req.session.username})
            .catch(err => {
                return res.status(400).send({ msg: 'Failed retrieving user' })
            });
        let url = req.url === '/' ? req.url : req.baseUrl;
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
    req.session.save();
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
