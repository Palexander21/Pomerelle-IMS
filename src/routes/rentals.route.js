const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/rentals.controller'),
    auth = require('../middleware/auth');


router.get('/', controller.get_rentals);

router.post('/', controller.add_equipment);

router.get('/returns', controller.get_returns);

router.post('/returns', controller.return);


module.exports = router;
