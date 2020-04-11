const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/equipment.api.controller');

router.get('/', controller.get_equipment);

router.post('/', controller.add_equipment);

router.put('/', controller.update_equipment);

module.exports = router;
