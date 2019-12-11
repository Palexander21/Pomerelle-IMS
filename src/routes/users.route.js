const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');

/* GET users listing. */
router.get('/', controller.findAll);

module.exports = router;
