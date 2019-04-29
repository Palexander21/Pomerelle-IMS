let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const users = mongoose.model('Users');


router.get('/', function(req, res, next) {
    users.find().then((users) => {
        res.render('tables', {
            title: 'Tables',
            users: users,
        });
    }).catch(() => { res.send('Sorry! Something went wrong.'); });


});

module.exports = router;
