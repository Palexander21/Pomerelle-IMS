const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.api.controller');

/* GET users listing. */
router.get('/', controller.findAll);

router.post('/', controller.newUser);

router.post('/:username', controller.login);

router.put('/:username', controller.update);

router.delete('/:username', controller.delete);

module.exports = router;
