const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/users.api.controller');

router.get('/', controller.findAll);

router.post('/create', controller.newUser);

router.post('/login', controller.login);

router.get('/logout', controller.logout);

router.put('/:username', controller.update);

router.delete('/:username', controller.delete);

module.exports = router;
