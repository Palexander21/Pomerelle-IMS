let express = require('express');
let router = express.Router();
const { body, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
const users = mongoose.model('Users');
const equipment = mongoose.model('Equipment');
const fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next){
    // let last_year = getDateRange(1);
    // equipment
    //     .countDocuments({ last_tune : {$lte: last_year, $ne: "N/A"} })
    //     .then((count) => {
    //         res.render('index', {
    //             title: 'Home',
    //             tunes: count
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })

    let raw = fs.readFileSync('rental_queue.json');
    let rentals = JSON.parse(raw);
    res.render('index', {
        title: 'Home',
        data: rentals.open,
        rentals: rentals.open.length,
    })
});

router.post('/', (req, res, next) => {
    let raw = fs.readFileSync('rental_queue.json');
    let rentals = JSON.parse(raw);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        rentals.open.push(req.body);
        fs.writeFileSync('rental_queue.json', JSON.stringify(rentals));
        res.render('index', {
            title: 'Home',
            data: rentals.open,
            rentals: rentals.open.length,
        });
    } else {
        console.log(errors.array());
        res.render('index', {
            title: 'Home'
        });
    }

});

router.get('/tasks', function (req, res, next) {
    let last_year = getDateRange(1);
    equipment.find({last_tune : {$lte: last_year}})
        .then((found) => {
            res.render('tasks', {
                title: 'Tasks',
                data: found
            })
        })
        .catch(error => {
            console.log(error);
        })
});

router.get('/charts', function(req, res, next) {

    res.render('charts', { title: 'Charts' });
});

function getDateRange(range=1) {
    let last_year = new Date();
    last_year.setFullYear(new Date().getFullYear() - range);
    return last_year.toISOString().split('T')[0];
}
module.exports = router;
