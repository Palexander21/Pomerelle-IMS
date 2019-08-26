let express = require('express');
let router = express.Router();
const { body, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
const equipment = mongoose.model('Equipment');
const customers = mongoose.model('Customers');
const open_rentals = mongoose.model('OpenRentals');
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

// Ajax endpoint that returns success if both ID's are valid. Otherwise returns the invalid part number
router.get('/id-check', async (req, res) => {
    let valid_boot = await equipment.findOne({upc: req.query.bootNumber})
        .catch(e => {
            console.log(e);
        });
    if (valid_boot) {
        let valid_ski = await equipment.findOne({upc: req.query.skiNumber})
            .catch(e => {
                console.log(e);
        });
        if (valid_ski) {
            res.send("Success")
        }
        else
            res.send('ski');
    }
    else
        res.send('boot');
});


router.post('/', async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        let customer = await customers.findOne({license: req.body.license});
        if (customer) {
            console.log(customer);
            let boots = await equipment.findOne({upc: req.body.bootNumber});
            let ski = await equipment.findOne({upc: req.body.skiNumber});
            if (boots) {
                console.log(boots);
                if (ski) {
                    console.log(ski);
                }
            }
            // customer.previousRentals.push(equip);
            await customer.save();
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
