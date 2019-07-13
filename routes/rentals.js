let express = require('express');
let router = express.Router();
const { body, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
const equipment = mongoose.model('Equipment');
const fs = require('fs');


router.get('/', function(req, res, next) {
    let raw = fs.readFileSync('rental_queue.json');
    let rentals = JSON.parse(raw);
    res.render('rentals', {
        title: 'Rentals',
        data: rentals.open,
    });

});

router.get('/open_rentals', function (req, res, next) {
    let raw = fs.readFileSync('rental_queue.json');
    let rentals = JSON.parse(raw);
    res.json(rentals.open);
});

router.post('/', (req, res, next) => {
    let raw = fs.readFileSync('rental_queue.json');
    let rentals = JSON.parse(raw);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        rentals.open.push(req.body);
        fs.writeFileSync('rental_queue.json', JSON.stringify(rentals));
        res.render('rentals', {
            title: 'Rentals',
            data: rentals.open,
        });
    } else {
        console.log(errors.array());
        res.render('rentals', {
            title: 'Rentals'
        });
    }
});

module.exports = router;
