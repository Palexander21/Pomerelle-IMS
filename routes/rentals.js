let express = require('express');
const { body, validationResult } = require('express-validator/check');
let router = express.Router();
const mongoose = require('mongoose');
const equipment = mongoose.model('Equipment');

router.get('/', function(req, res, next) {
    // rentals.find({}).then(function (err, rentals) {
    //     if (err) throw err;
    //
    //     res.render('rentals', {
    //         title: 'Rentals',
    //         rentals: rentals,
    //     });
    // });
    res.render('rentals', {
                title: 'Rentals',
            });

});

module.exports = router;
