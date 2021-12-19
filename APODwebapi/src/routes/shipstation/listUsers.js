const express = require("express");
const router = express.Router();
const listUsersController = require('../../controllers/shipstation/listUserController');

router.get('/', listUsersController.getAll);

module.exports = router;