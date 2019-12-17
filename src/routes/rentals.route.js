const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/rentals.controller'),
    auth = require('../middleware/auth');


router.get('/', auth.isAuthorized, controller.get_rentals);

router.post('/', auth.isAuthorized, controller.add_equipment);

router.get('/returns', auth.isAuthorized, controller.get_returns);

router.post('/returns', auth.isAuthorized, controller.return);


module.exports = router;
