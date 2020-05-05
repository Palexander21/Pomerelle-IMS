const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/equipment.api.controller');

router.get('/', controller.get_all);

router.get('/:number', controller.get_equipment);

router.post('/', controller.add_equipment);

router.put('/:number', controller.update_equipment);

router.delete('/:number', controller.delete_equipment);

module.exports = router;
