let express = require('express');
let router = express.Router();
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
        }).catch(() => { res.send('Sorry! Something went wrong.'); });
    })).catch(() => { res.send('Sorry! Something went wrong.'); });
    // users.find().then((users) => {
    //     res.render('tables', {
    //         title: 'Tables',
    //         users: users,
    //     });
    // }).catch(() => { res.send('Sorry! Something went wrong.'); });


});

module.exports = router;
