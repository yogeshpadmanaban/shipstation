const express = require("express");
const router = express.Router();
const listServicesController = require('../../controllers/shipstation/listServicesController');

router.get('/:carrierCode', listServicesController.getAll);

module.exports = router;