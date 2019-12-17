const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/users.api.controller'),
    auth = require('../../../middleware/auth');

/* GET users listing. */
router.get('/', controller.findAll);

router.post('/create', auth.isAuthorized, controller.newUser);

router.post('/login', controller.login);

router.get('/logout', controller.logout);

router.put('/:username', auth.isAuthorized, controller.update);

router.delete('/:username', auth.isAuthorized, controller.delete);

module.exports = router;
