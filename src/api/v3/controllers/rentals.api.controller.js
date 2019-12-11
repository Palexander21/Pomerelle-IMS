const { body, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
const equipment = mongoose.model('Equipment');
const customers = mongoose.model('Customers');
const open_rentals = mongoose.model('OpenRentals');
const rentals = mongoose.model('Rentals');

let controller = {};

controller.get_all = async (req, res) => {
    let rentals_list = await rentals.find()
        .catch(e => {
            console.error(`Failed to collect rentals list ${e}`);
            return res.status(500).send({
                msg: 'Failed to collect rentals list'
            })
        });
    if (rentals_list) {
        return res.send({
            data: rentals_list,
            size: rentals_list.length,
        })
    }
    else {
        return res.status(404).send({
            msg: 'No rentals found',
        })
    }

};

controller.get_open_rentals = async (req, res) => {
    let open_rentals_list = await open_rentals.find()
        .catch(e => {
            console.error(`Failed to collect open rentals list ${e}`);
            return res.status(500).send({
                msg: 'Failed to collect open rentals list'
            })
        });
    if (open_rentals_list) {
        return res.send({
            data: open_rentals_list,
            size: open_rentals_list.length,
        })
    }
    else {
        return res.status(400).send({
            msg: 'No open rentals found',
        })
    }

};

controller.check_id = async (req, res) => {
    let valid = await equipment.findOne({upc: req.query.number})
        .catch(e => {
            console.error(`Failed to find equipment by query "upc: ${req.query.number}: ${e}`);
            return res.status(500).send({
                msg: `Failed to find equipment by query "upc: ${req.query.number}: ${e}`
            })
        });
    if (valid)
        return res.send({
            msg: "success"
        });
    else
        return res.status(404).send({
            msg: 'No Matching Item'
        });
};

controller.get_returns = async (req, res) => {
    let returns = await rentals.find({returned: false})
        .catch(e => {
            console.error(`Failed to collect returns list ${e}`);
            return res.status(500).send({
                msg: 'Failed to collect returns'
            })
        });
    if (returns) {
        return res.send({
            data: returns,
            size: returns.length,
        })
    }
    else
        return res.status(404).send({
            msg: 'No returns found'
        })
};

controller.returned = async (req, res) => {
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
                console.error(`Failed to return rental ${e}`);
                return res.status(500).send({
                    msg: 'Failed to return rental'
                })
            });
        console.log(rental);
        return res.send({
            msg: 'Rental successfully returned'
        });
    }else {
        console.error('Failed to validate POST request: ' + errors.array());
        return res.status(500).send({
            msg: 'Failed to validate POST'
        })
    }
};

controller.completed_rental = async (req, res) => {
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
                return res.status(500).send({
                    msg: 'Failed to delete open rental'
                })
            }
            return res.send({
                rental: rental,
                customer: customer,
            })
        });
    } else {
        console.error('Failed to validate POST request: ' + errors.array());
        return res.status(500).send({
            msg: 'Failed to validate POST'
        })
    }
};

module.exports = controller;