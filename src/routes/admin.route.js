const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/admin.controller');

router.get('/', controller.get_admin);

router.get('/users', controller.get_users);

router.get('/configure', controller.get_configure);

router.get('/configure/tickets', controller.get_tickets_config);

router.get('/configure/kitchen', controller.get_kitchen_config);

router.get('/inventory', controller.get_inventory);

router.get('/inventory/equipment', controller.get_equipment_inventory)

router.get('/inventory/kitchen', controller.get_kitchen_inventory)

router.get('/inventory/tickets', controller.get_ticket_inventory)

module.exports = router;