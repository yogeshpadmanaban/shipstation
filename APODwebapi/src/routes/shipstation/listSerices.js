const express = require("express");
const router = express.Router();

const listServicesController = require('../../controllers/shipstation/listServicesController');

router.get('/', listServicesController.getAll);
// router.post('/', listServicesController.createNew);

module.exports = router;