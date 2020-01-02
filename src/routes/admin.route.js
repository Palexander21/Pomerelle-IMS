const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/admin.controller');

router.get('/', controller.get_admin);


module.exports = router;