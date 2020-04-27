const mongoose = require('mongoose');
const User = mongoose.model('Users');
const {body, validationResult} = require('express-validator/check');
const bcrypt = require('bcrypt');
const auth = require('../../../../src/middleware/auth');

let controller = {};


module.exports = controller;
