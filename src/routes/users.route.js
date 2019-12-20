const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/users.controller'),
    auth = require('../middleware/auth');

router.get('/login', controller.login);

router.get('/create', controller.create);

module.exports = router;
