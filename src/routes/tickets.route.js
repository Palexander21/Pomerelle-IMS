const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/tickets.controller');

router.get('/', controller.get_ticketing);

module.exports = router;
