const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/tickets.api.controller')
;

router.get('/', controller.get_tickets);

router.get('/:ticket', controller.get_ticket_price);

router.post('/', controller.add_ticket);

router.put('/:ticket', controller.update_ticket);

router.delete('/:ticket', controller.delete_ticket);

module.exports = router;
