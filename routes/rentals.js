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
            console.error(`Failed to collect open rentals list ${e}`);
        });
    if (open_rentals_list) {
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

router.get('/returns', async (req, res) => {
   let returns = await rentals.find({returned: false})
       .catch(e => {
           console.error(`Failed to collect returns list ${e}`);
       });
   if (returns) {
       res.render('returns', {
           title: 'Returns',
           data: returns,
           rentals: returns.length,
       })
   }
});

router.post('/returns', async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const rental = await rentals.updateOne(
            {
                $and: [
                    {'customer.license': req.body.license},
                    {returned: false}
                ]
            },
            {
                $set: {
                    returned: true,
                    note: req.body.inputNote
                }

            })
            .catch(e => {
                console.error(`Failed to collect returns list ${e}`);
            });
        console.log(rental);
    }else {
        console.log(errors.array());
    }
    res.redirect('returns');
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
        ski.rth = req.body.rth;
        ski.lth = req.body.lth;
        if (customer) {
            if (poles) {
                poles.last_used = today;
                customer.previousRentals.push([boots, ski, poles]);
            }
            else {
                customer.previousRentals.push([boots, ski]);
            }
        }

        else {
            customer = new customers(req.body);
            if (poles) {
                poles.last_used = today;
                customer.previousRentals.push([boots, ski, poles]);
            }
            else {
                customer.previousRentals.push([boots, ski]);
            }
        }
        let rental = new rentals({customer: customer, equipment: [ski, boots, poles], date: today, technician: req.body.techSignature, returned: false});
        await customer.save();
        await rental.save();
        await open_rentals.findOneAndDelete({'customer.license': customer.license}, (err, doc) => {
             if (err) {
                 console.error(`Failed to delete open rental ${err}`);
             }
         });
    } else {
        console.log(errors.array());
    }
    res.redirect('/rentals');
});

module.exports = router;
