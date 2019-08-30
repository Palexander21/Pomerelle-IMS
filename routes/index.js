let express = require('express');
let router = express.Router();
const { body, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
const users = mongoose.model('Users');
const equipment = mongoose.model('Equipment');
const customers = mongoose.model('Customers');
const open_rentals = mongoose.model('OpenRentals');
const rentals = mongoose.model('Rentals');
const fs = require('fs');


/* GET home page. */
router.get('/', async function(req, res, next){
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

    let new_count = await open_rentals.countDocuments()
        .catch(e => {
            console.log(e);
        });
    let return_count = await rentals.countDocuments({returned: false});
        res.render('index', {
            title: 'Home',
            rentals: new_count,
            returns: return_count
        })
});

router.post('/', async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        let customer = await customers.findOne({license: req.body.license});
        if (!customer) {
            customer = new customers(req.body);
            await customer.save();
        }
        let new_open_rental = new open_rentals({customer: customer});
        await new_open_rental.save();
        let count = await open_rentals.countDocuments();
        res.render('index', {
            title: 'Dashboard',
            rentals: count,
        });
    } else {
        console.log(errors.array());
        res.render('index', {
            title: 'Dashboard'
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
