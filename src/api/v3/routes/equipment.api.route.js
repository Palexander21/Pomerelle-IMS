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
            console.error(`Failed to find users: ${err}`);
            res.send('Failed to find users');
        });
    })).catch((err) => {
        console.error(`Failed to find equipment: ${err}`);
        res.send('Failed to find equipment');
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
