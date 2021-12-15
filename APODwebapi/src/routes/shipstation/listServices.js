const express = require("express");
const router = express.Router();

const listServicesController = require('../../controllers/shipstation/listServicesController');

router.post('/', listServicesController.createNew);
// router.post('/', listServicesController.createNew);

module.exports = router;