let express = require('express');
const { body, validationResult } = require('express-validator/check');
let router = express.Router();
const mongoose = require('mongoose');
const users = mongoose.model('Users');

router.get('/', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/', async function (req, res, next) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        let user = await users.findOne({username: req.body.username});
        if (user) {
            return res.status(400).send("User already exists.");
        } else {
            user = new users(req.body);
            await user.save();
            res.render('success', {
                title: 'Success',
                username: req.body.username,
            });
        }
    } else {
        res.render('register', {
            title: 'Register',
            errors: errors.array(),
            data: req.body,
        });
    }
});

router.get('/success', function (req, res, next) {
    res.render()
})
module.exports = router;