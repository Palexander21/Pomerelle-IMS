const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/rentals.api.controller')
;


router.get('/', controller.get_all);

router.get('/open', controller.get_open_rentals);

router.get('/open/count', controller.get_open_count);

router.get('/:id', controller.check_id);

router.get('/returns', controller.get_returns);

router.get('/returns/count', controller.get_returns_count);

router.post('/', controller.new_rental);

router.post('/returns', controller.returned);

router.post('/completed', controller.completed_rental);

module.exports = router;
