const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/pos.api.controller')
;

router.get('/tickets', controller.get_tickets);

router.get('/tickets/:ticket', controller.get_ticket_price);

router.post('/tickets', controller.add_ticket);

router.put('/tickets/:ticket', controller.update_ticket);

router.delete('/tickets/:ticket', controller.delete_ticket);

router.get('/kitchen', controller.get_kitchen_items);

router.get('/kitchen/:item', controller.get_item_price);

router.post('/kitchen', controller.add_item);

router.put('/kitchen/:item', controller.update_item);

router.delete('/kitchen/:item', controller.delete_item);

router.get('/configuration/:id', controller.get_config)

router.post('/configuration', controller.save_config)

module.exports = router;