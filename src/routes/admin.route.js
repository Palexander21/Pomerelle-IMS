const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/admin.controller');

router.get('/', controller.get_admin);

router.get('/users', controller.get_users);

module.exports = router;