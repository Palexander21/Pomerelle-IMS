const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/admin.controller');

router.get('/', controller.get_admin);

router.get('/users', controller.get_users);

router.get('/configure', controller.get_configure);

router.get('/configure/tickets', controller.get_ticketing);

router.get('/configure/kitchen', controller.get_kitchen);

router.get('/inventory', controller.get_inventory);

//router.get('/inventory/equipment', controller.get_equipment)

module.exports = router;