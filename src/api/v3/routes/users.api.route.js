const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/users.api.controller');

router.get('/', controller.findAll);

router.get('/user/:username', controller.findUser);

router.post('/create', controller.newUser);

router.post('/login', controller.login);

router.get('/logout', controller.logout);

router.put('/update/:id', controller.update);

router.delete('/delete/:username', controller.delete);

module.exports = router;
