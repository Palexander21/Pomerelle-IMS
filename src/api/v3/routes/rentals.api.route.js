const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/rentals.api.controller')
;


router.get('/', controller.get_all);

router.get('/open_rentals', controller.get_open_rentals);

router.get('/id-check', controller.check_id);

router.get('/returns', controller.get_returns);

router.post('/returns', controller.returned);

router.post('/completed', controller.completed_rental);

module.exports = router;
