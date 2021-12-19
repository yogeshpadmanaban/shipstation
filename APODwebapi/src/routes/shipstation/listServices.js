const express = require("express");
const router = express.Router();
const listServicesController = require('../../controllers/shipstation/listServicesController');

router.post('/', listServicesController.getAll);

module.exports = router;