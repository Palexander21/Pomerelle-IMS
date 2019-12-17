const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/tables.controller'),
    auth = require('../middleware/auth');

router.get('/', auth.isAuthorized, controller.get_tables);

module.exports = router;
