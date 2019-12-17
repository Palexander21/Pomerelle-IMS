const { body, validationResult } = require('express-validator/check'),
    mongoose = require('mongoose'),
    customers = mongoose.model('Customers'),
    open_rentals = mongoose.model('OpenRentals'),
    rentals = mongoose.model('Rentals')
;

let controller = {};

controller.getDashboard = async (req, res, next) => {
    let new_count = await open_rentals.countDocuments()
        .catch(e => {
            console.error(`Failed to count open_rentals: ${e}`);
        });
    let return_count = await rentals.countDocuments({returned: false});
    return res.render('index', {
        title: 'Home',
        user: req.session.user,
        rentals: new_count,
        returns: return_count
    })
};

controller.startRental = async (req, res, next) => {
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
            user: req.session.user,
            rentals: count,
        });
    } else {
        console.error('Failed to validate POST request: ' + errors.array());
        res.render('index', {
            title: 'Dashboard',
            user: req.session.user,
        });
    }

};

module.exports = controller;
