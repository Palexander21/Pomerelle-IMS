const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/tables.controller');

router.get('/', controller.get_tables);

module.exports = router;
