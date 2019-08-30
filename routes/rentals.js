let express = require('express');
let router = express.Router();
const { body, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
const equipment = mongoose.model('Equipment');
const customers = mongoose.model('Customers');
const open_rentals = mongoose.model('OpenRentals');
const rentals = mongoose.model('Rentals');
const fs = require('fs');


router.get('/', async function(req, res, next) {
    let open_rentals_list = await open_rentals.find()
        .catch(e => {
            console.log(e);
        });
    if (open_rentals_list) {
        console.log(open_rentals_list);
        res.render('rentals', {
            title: 'Rentals',
            data: open_rentals_list,
            rentals: open_rentals_list.length,
        })
    }
    else {
        res.render('rentals', {
            title: 'Rentals',
        })
    }

});

// Ajax endpoint that returns success if both ID's are valid
router.get('/id-check', async (req, res) => {
    let valid = await equipment.findOne({upc: req.query.number})
        .catch(e => {
            console.log(e);
            res.send('Error: ${e}')
        });
    if (valid)
        res.send("success");
    else
        res.send('No Matching Item');
});


router.post('/', async (req, res, next) => {
    const errors = validationResult(req);
    const today = new Date().toISOString().split('T')[0];
    if (errors.isEmpty()) {
        let customer = await customers.findOne({license: req.body.license});
        let boots = await equipment.findOne({upc: req.body.bootNumber});
        let ski = await equipment.findOne({upc: req.body.skiNumber});
        let poles = await equipment.findOne({upc: req.body.poleNumber});
        boots.last_used = today;
        ski.last_used = today;
        ski.rt = req.body.rt;
        ski.lt = req.body.lt;
        ski.rh = req.body.rth;
        ski.lh = req.body.lth;
        if (customer) {
            console.log(customer);
            if (poles) {
                poles.last_used = today;
                customer.previousRentals.push([boots, ski, poles]);
            }
            else {
                customer.previousRentals.push([boots, ski]);
            }
            let rental = new rentals({customer: customer, equipment: [ski, boots]});
            await rental.save();
            res.render('rentals', {
                title: 'Rentals',
                data: [
                    {customer: customer}
                ],
            });
        }

        else {
            customer = new customers(req.body);
            await customer.save();
            res.render('rentals', {
                title: 'Rentals',
                data: [],
            });
        }
    } else {
        console.log(errors.array());
        res.render('rentals', {
            title: 'Rentals'
        });
    }
});

module.exports = router;
