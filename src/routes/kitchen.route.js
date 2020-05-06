const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/kitchen.controller');

router.get('/', controller.get_kitchen);

module.exports = router;
