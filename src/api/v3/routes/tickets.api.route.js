const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/tickets.api.controller')
;

router.get('/:ticket', controller.get_ticket_price);

module.exports = router;
