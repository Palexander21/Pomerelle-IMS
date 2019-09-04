let express = require('express');
let router = express.Router();
const { body, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
const users = mongoose.model('Users');
const equipment = mongoose.model('Equipment');


router.get('/', function(req, res, next) {
    equipment.find().then((equipment => {
        users.find().then((users) => {
            res.render('tables', {
                title: 'Tables',
                users: users,
                equipment: equipment,
            });
        }).catch((err) => {
            console.log(err);
            res.send('Sorry! Something went wrong.');
        });
    })).catch((err) => {
        console.log(err);
        res.send('Sorry! Something went wrong.');
    });
});

router.post('/', async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        let equip = new equipment(req.body);
        await equip.save();

    }
    res.redirect('tables');

});

module.exports = router;
