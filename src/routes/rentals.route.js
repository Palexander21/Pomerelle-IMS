const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/rentals.controller'),
    auth = require('../middleware/auth');

router.get('/', controller.get_rental_shop);

router.post('/', controller.startRental);

router.get('/rentals', controller.get_rentals);

router.post('/rentals', controller.add_equipment);

router.get('/returns', controller.get_returns);

router.post('/returns', controller.return);


module.exports = router;
